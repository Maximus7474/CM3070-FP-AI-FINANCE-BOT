import requests
import json
import os
import subprocess
import sys
import time
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/chat"
OLLAMA_BASE = "http://localhost:11434"
MODEL = "0xroyce/plutus"

def get_base_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys.executable).parent
    return Path(__file__).parent


def get_ollama_binary_path() -> Path:
    base = get_base_dir()
    binary_name = "ollama.exe" if sys.platform == "win32" else "ollama"
    return base / "ollama" / binary_name


def get_models_dir() -> Path:
    models_dir = get_base_dir() / "ollama" / "models"
    models_dir.mkdir(parents=True, exist_ok=True)
    return models_dir


class OllamaClient:
    """
    Configurable wrapper around a bundled Ollama instance.
    The use of a class based wrapper should allow us to also
    use external systems (i.e. paid LLMs such as Claude, ChatGPT).
    
    Note:
    We should be able to do all of this just with ollama I think. 
    """

    def __init__(self, default_model: str = MODEL, base_url: str = OLLAMA_BASE):
        self.default_model = default_model
        self.base_url = base_url
        self.chat_url = f"{base_url}/api/chat"
        self._started = False

    def start(self) -> None:
        """Ensure the bundled server is running. Call once at app startup."""
        if not self._started:
            ensure_ollama_running(base_url=self.base_url)
            self._started = True

    def ensure_model(self) -> None:
        """
        Pull a given model (or the default) if not already present.
        """
        ensure_model_available(self.default_model, base_url=self.base_url)


    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> str:
        """
        Send a chat request to a specific model.
        """
        payload = {
            "model": self.default_model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "options": {"temperature": temperature},
            "stream": stream,
        }
        response = requests.post(self.chat_url, json=payload, timeout=120)
        response.raise_for_status()
        return response.json()["message"]["content"]


def ensure_ollama_running(timeout: int = 20, base_url: str = OLLAMA_BASE) -> None:
    """
    Start the vendored Ollama server if it's not already running.
    """
    try:
        requests.get(base_url, timeout=2)
        return  # already running
    except requests.exceptions.ConnectionError:
        pass

    ollama_path = get_ollama_binary_path()
    if not ollama_path.exists():
        raise FileNotFoundError(
            f"Vendored ollama binary not found at {ollama_path}. "
            "Make sure it's included in the sidecar build."
        )

    print(f"Starting bundled Ollama server from {ollama_path} ...")
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
            print("Ollama server is up.")
            return
        except requests.exceptions.ConnectionError:
            time.sleep(1)

    raise RuntimeError("Bundled Ollama server did not start in time.")


def ensure_model_available(model: str = MODEL, base_url: str = OLLAMA_BASE) -> None:
    """
    Hlper function to check if the model is present on the system.
    """
    resp = requests.get(f"{base_url}/api/tags", timeout=5)
    resp.raise_for_status()
    local_models = [m["name"] for m in resp.json().get("models", [])]

    if any(model == m or m.startswith(f"{model}:") for m in local_models):
        return

    print(f"Model '{model}' not found — pulling into {get_models_dir()} ...")
    ollama_path = get_ollama_binary_path()
    env = os.environ.copy()
    env["OLLAMA_MODELS"] = str(get_models_dir())
    subprocess.run([str(ollama_path), "pull", model], check=True, env=env)


# ---------------------------------------------------------------------------
# Guidance helper, prompts the system with rules and conditions it needs
# to follow. Helps us avoid out of context or inaccuracies
# ---------------------------------------------------------------------------
SYSTEM_PROMPT = """You are a financial explanation assistant embedded in a
self-hosted advisor app. Your job is to explain WHY a stock recommendation
was made, using ONLY the data provided to you in the user message.

Rules:
- Do not invent numbers or facts not present in the supplied data.
- Be clear and concise; assume the user is not a finance expert.
- Always mention key risks or counterpoints, not just the bullish case.
- Never present this as guaranteed financial advice.
- If the supplied data is insufficient to justify the recommendation,
  say so explicitly rather than filling gaps with assumptions.
"""


def build_user_prompt(ticker: str, recommendation: str, data: dict) -> str:
    """ 
    This function would be called from the core system after receiving data
    from the RL agent, values listed here are placeholders and will differ
    """
    data_block = json.dumps(data, indent=2)
    return f"""Stock: {ticker}
Recommendation: {recommendation}

Supporting data:
{data_block}

Explain this recommendation to the user in plain language, referencing
the specific data points above."""


if __name__ == "__main__":
    client = OllamaClient(default_model=MODEL)
    client.start()
    client.ensure_model()

    example_data = {
        "pe_ratio": 18.4,
        "sector_avg_pe": 24.1,
        "revenue_growth_yoy": "12%",
        "debt_to_equity": 0.35,
        "analyst_consensus": "Buy",
        "recent_news_sentiment": "Mixed: strong earnings beat, but supply chain concerns",
    }

    user_prompt = build_user_prompt(
        ticker="ACME",
        recommendation="Buy",
        data=example_data,
    )

    explanation = client.chat(SYSTEM_PROMPT, user_prompt)
    print(explanation)