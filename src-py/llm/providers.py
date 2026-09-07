"""
LLM provider abstraction layer.

Every backend the app can talk to implements `LLMProvider` and is
registered in `PROVIDER_REGISTRY`. The FastAPI layer and the frontend
only ever see provider ids, so adding a new backend (e.g. hosted
providers like OpenAI or Anthropic) means implementing one class and
registering it - no API or UI rework needed.

Currently implemented:
- ollama: local, free models via a local Ollama server.

Planned (stubs, registered but disabled):
- openai / anthropic: paid hosted providers, requiring API keys.
"""

import os
import shutil
import subprocess
import sys
import time
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any, Dict, List

import requests

OLLAMA_BASE = "http://localhost:11434"
DEFAULT_OLLAMA_MODEL = "0xroyce/plutus"


# ---------------------------------------------------------------------------
# Provider contract
# ---------------------------------------------------------------------------
class LLMProvider(ABC):
    """Contract shared by every LLM backend (local or hosted)."""

    id: str = ""
    display_name: str = ""
    # Whether the backend is wired up and selectable in the UI right now.
    available: bool = False
    # Shown in the UI when the provider is not available yet.
    setup_hint: str = ""

    def start(self) -> None:
        """Ensure the backend is ready to serve requests.

        No-op by default; local providers override this to launch their server.
        """

    @abstractmethod
    def is_available(self) -> bool:
        """Whether this provider can currently serve requests."""

    @abstractmethod
    def list_models(self) -> List[Dict[str, Any]]:
        """Models this provider can currently serve."""

    def has_model(self, model: str) -> bool:
        """Whether a specific model is usable right now.

        Providers that cannot check cheaply return True and let the
        request fail with a meaningful error instead.
        """
        return True

    @abstractmethod
    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> str:
        """Run a single chat completion and return the reply text."""


# ---------------------------------------------------------------------------
# Ollama (local, free) - fully implemented
# ---------------------------------------------------------------------------
def _get_base_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys.executable).parent
    return Path(__file__).parent


def get_ollama_binary_path() -> Path:
    base = _get_base_dir()
    binary_name = "ollama.exe" if sys.platform == "win32" else "ollama"
    return base / "ollama" / binary_name


def get_models_dir() -> Path:
    models_dir = _get_base_dir() / "ollama" / "models"
    models_dir.mkdir(parents=True, exist_ok=True)
    return models_dir


def _find_ollama_binary() -> Path | None:
    """Prefer the vendored binary, fall back to a system-wide install on PATH."""
    vendored = get_ollama_binary_path()
    if vendored.exists():
        return vendored
    found = shutil.which("ollama")
    return Path(found) if found else None


def ensure_ollama_running(timeout: int = 20, base_url: str = OLLAMA_BASE) -> None:
    """
    Start an Ollama server if one isn't already running.

    Tries the vendored binary first, then a system-wide `ollama` install.
    Raises FileNotFoundError when no binary can be found.
    """
    try:
        requests.get(base_url, timeout=2)
        return  # already running
    except requests.exceptions.ConnectionError:
        pass

    ollama_path = _find_ollama_binary()
    if ollama_path is None:
        raise FileNotFoundError(
            f"No running Ollama server found at {base_url} and no ollama "
            "binary found (vendored or on PATH). Install Ollama from "
            "https://ollama.com and make sure it is running."
        )

    print(f"[Ollama] Starting server from {ollama_path} ...")
    env = os.environ.copy()
    env["OLLAMA_MODELS"] = str(get_models_dir())

    creationflags = subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0
    subprocess.Popen(
        [str(ollama_path), "serve"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        env=env,
        creationflags=creationflags,
    )

    for _ in range(timeout):
        try:
            requests.get(base_url, timeout=2)
            print("[Ollama] Server is up.")
            return
        except requests.exceptions.ConnectionError:
            time.sleep(1)

    raise RuntimeError("Ollama server did not start in time.")


class OllamaProvider(LLMProvider):
    id = "ollama"
    display_name = "Ollama (local)"
    available = True
    setup_hint = ""

    def __init__(self, base_url: str = OLLAMA_BASE):
        self.base_url = base_url
        self._started = False

    def start(self) -> None:
        """Ensure a local Ollama server is running. Safe to call repeatedly."""
        if self._started and self.is_available():
            return
        ensure_ollama_running(base_url=self.base_url)
        self._started = True

    def is_available(self) -> bool:
        try:
            requests.get(self.base_url, timeout=2)
            return True
        except requests.exceptions.ConnectionError:
            return False

    def list_models(self) -> List[Dict[str, Any]]:
        resp = requests.get(f"{self.base_url}/api/tags", timeout=5)
        resp.raise_for_status()
        models: List[Dict[str, Any]] = []
        for m in resp.json().get("models", []):
            details = m.get("details") or {}
            models.append(
                {
                    "name": m.get("name"),
                    "size": m.get("size"),
                    "parameter_size": details.get("parameter_size"),
                    "quantization_level": details.get("quantization_level"),
                    "family": details.get("family"),
                }
            )
        return models

    def has_model(self, model: str) -> bool:
        names = [m["name"] for m in self.list_models()]
        return any(model == n or n.startswith(f"{model}:") for n in names)

    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> str:
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "options": {"temperature": temperature},
            "stream": stream,
        }
        response = requests.post(
            f"{self.base_url}/api/chat", json=payload, timeout=120
        )
        response.raise_for_status()
        return response.json()["message"]["content"]


# ---------------------------------------------------------------------------
# Hosted providers - planned for a future release (stubs)
# ---------------------------------------------------------------------------
class _RemoteProviderStub(LLMProvider):
    """
    Placeholder for a hosted provider.

    To enable one: implement list_models() and chat() (API-key handling
    included), flip `available` to True, and the registry/UI pick it up
    automatically.
    """

    def __init__(self, provider_id: str, display_name: str, setup_hint: str):
        self.id = provider_id
        self.display_name = display_name
        self.setup_hint = setup_hint
        self.available = False

    def is_available(self) -> bool:
        return False

    def list_models(self) -> List[Dict[str, Any]]:
        raise NotImplementedError(
            f"{self.display_name} support is planned for a future release."
        )

    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> str:
        raise NotImplementedError(
            f"{self.display_name} support is planned for a future release."
        )


class OpenAIProvider(_RemoteProviderStub):
    def __init__(self):
        super().__init__(
            "openai",
            "OpenAI (ChatGPT)",
            "Requires an OpenAI API key - coming soon.",
        )


class AnthropicProvider(_RemoteProviderStub):
    def __init__(self):
        super().__init__(
            "anthropic",
            "Anthropic (Claude)",
            "Requires an Anthropic API key - coming soon.",
        )


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------
PROVIDER_REGISTRY: Dict[str, LLMProvider] = {
    "ollama": OllamaProvider(),
    "openai": OpenAIProvider(),
    "anthropic": AnthropicProvider(),
}


def get_provider(provider_id: str) -> LLMProvider:
    provider = PROVIDER_REGISTRY.get(provider_id)
    if provider is None:
        raise KeyError(f"Unknown LLM provider: '{provider_id}'")
    return provider


def list_providers() -> List[Dict[str, Any]]:
    """Serialized provider descriptors for the API/frontend."""
    return [
        {
            "id": p.id,
            "name": p.display_name,
            "available": p.available,
            "status": p.is_available() if p.available else False,
            "setup_hint": p.setup_hint,
        }
        for p in PROVIDER_REGISTRY.values()
    ]
