"""Test bootstrap and shared fixtures for the src-py Python suite.

Import-time note: ``utils.path`` parses a REQUIRED ``--data-dir`` argument while
it is imported (the Tauri sidecar always passes one). This conftest therefore
guarantees a value is on ``sys.argv`` and puts src-py on ``sys.path`` before any
application module is imported.

Everything that would touch the outside world is replaced by a test double or
monkeypatch, so the suite runs offline.
"""

from __future__ import annotations

import json
import sys
import tempfile
from pathlib import Path

import pytest

SRC_PY_DIR = Path(__file__).resolve().parent.parent
TESTS_DIR = Path(__file__).resolve().parent

for _path in (str(TESTS_DIR), str(SRC_PY_DIR)):
    if _path not in sys.path:
        sys.path.insert(0, _path)


def pytest_addoption(parser):
    """Accept --data-dir so it can be forwarded to utils.path's parser."""
    parser.addoption(
        "--data-dir",
        action="store",
        default=None,
        help="Data directory for utils.path.StorageManager (defaults to a temp dir).",
    )


if not any(arg == "--data-dir" or arg.startswith("--data-dir=") for arg in sys.argv[1:]):
    sys.argv.append(f"--data-dir={tempfile.mkdtemp(prefix='src-py-tests-data-')}")

from _fakes import FakeProvider, make_ohlcv  # noqa: E402  (after sys.path setup)


# ---------------------------------------------------------------------------
# Market data
# ---------------------------------------------------------------------------

@pytest.fixture
def ohlcv_factory():
    """Factory for deterministic synthetic OHLCV frames."""
    return make_ohlcv


@pytest.fixture
def market_data() -> dict:
    """Indicator-augmented frames for three tickers (ready for TradingEnv)."""
    from rl_pipeline.data import add_indicators

    return {
        ticker: add_indicators(make_ohlcv(seed=index + 1))
        for index, ticker in enumerate(("AAA", "BBB", "CCC"))
    }


# ---------------------------------------------------------------------------
# LLM backend substitute
# ---------------------------------------------------------------------------

@pytest.fixture
def fake_provider(monkeypatch):
    """Register a FakeProvider and make it the active provider/model."""
    import llm.main as llm_main
    from llm.providers import PROVIDER_REGISTRY

    provider = FakeProvider()
    monkeypatch.setitem(PROVIDER_REGISTRY, "fake", provider)
    monkeypatch.setattr(llm_main, "active_provider_id", "fake")
    monkeypatch.setattr(llm_main, "active_model", "fake-model")
    return provider


@pytest.fixture
def register_provider(monkeypatch):
    """Register an arbitrary provider double in the real registry."""
    from llm.providers import PROVIDER_REGISTRY

    def _register(provider, provider_id):
        # keep the double's advertised id in sync with its registry key
        if hasattr(provider, "id"):
            provider.id = provider_id
        monkeypatch.setitem(PROVIDER_REGISTRY, provider_id, provider)
        return provider

    return _register


# ---------------------------------------------------------------------------
# Output isolation
# ---------------------------------------------------------------------------

@pytest.fixture
def isolated_output_dir(tmp_path, monkeypatch):
    """Point every OUTPUT_DIR consumer at a per-test temp directory.

    Modules bind ``OUTPUT_DIR`` at import time (``from config import OUTPUT_DIR``),
    so each module-level reference has to be patched individually.
    """
    import config
    import llm.main as llm_main
    import rl_pipeline.main as rl_main

    output_dir = tmp_path / "output"
    output_dir.mkdir(parents=True, exist_ok=True)
    monkeypatch.setattr(config, "OUTPUT_DIR", output_dir)
    monkeypatch.setattr(llm_main, "OUTPUT_DIR", output_dir)
    monkeypatch.setattr(rl_main, "OUTPUT_DIR", output_dir)
    return output_dir


# ---------------------------------------------------------------------------
# Committed sample + FastAPI client
# ---------------------------------------------------------------------------

@pytest.fixture(scope="session")
def recommendations_sample():
    """The committed recommendations.json sample, parsed."""
    with (SRC_PY_DIR / "recommendations.json").open("r", encoding="utf-8") as handle:
        return json.load(handle)


@pytest.fixture(scope="session")
def api_client():
    """A FastAPI TestClient for src-py/main.py."""
    from fastapi.testclient import TestClient

    import main as src_py_main

    return TestClient(src_py_main.app)
