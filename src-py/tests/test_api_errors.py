"""FastAPI layer: parameter validation, error mapping and fallback values.

The routes import their collaborators into the ``main`` module namespace, so
tests monkeypatch ``main`` attributes to drive each error branch without
touching real LLM/RL machinery.
"""

import pytest
import requests

import main as app_module
from _fakes import FakeProvider
from config import TICKERS


# ---------------------------------------------------------------------------
# Basic / providers
# ---------------------------------------------------------------------------

def test_health_returns_ok(api_client):
    response = api_client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_llm_providers_lists_the_registry(api_client, fake_provider, monkeypatch):
    from llm.providers import OllamaProvider

    # keep the localhost availability probe deterministic/offline
    monkeypatch.setattr(OllamaProvider, "is_available", lambda self: False)

    response = api_client.get("/llm/providers")

    assert response.status_code == 200
    body = response.json()
    assert body["active"] == {"provider": "fake", "model": "fake-model"}
    assert any(provider["id"] == "fake" for provider in body["providers"])
    assert all(
        {"id", "name", "available", "status", "setup_hint"} <= set(provider)
        for provider in body["providers"]
    )


def test_llm_models_returns_models_for_the_active_provider(
    api_client, fake_provider, monkeypatch
):
    from llm.providers import OllamaProvider

    monkeypatch.setattr(OllamaProvider, "is_available", lambda self: True)

    response = api_client.get("/llm/models", params={"provider": "fake"})

    assert response.status_code == 200
    body = response.json()
    assert body["provider"] == "fake"
    assert body["current_model"] == "fake-model"
    assert body["ollama_running"] is True
    assert body["models"][0]["name"] == "fake-model"


def test_llm_models_rejects_an_unavailable_provider(api_client, register_provider):
    register_provider(FakeProvider(available=False), "unavailable")

    response = api_client.get("/llm/models", params={"provider": "unavailable"})

    assert response.status_code == 400


def test_llm_models_maps_backend_failure_to_503(api_client, monkeypatch):
    def boom(provider_id="ollama"):
        raise requests.exceptions.ConnectionError("no ollama")

    monkeypatch.setattr(app_module, "list_models", boom)

    response = api_client.get("/llm/models")

    assert response.status_code == 503


# ---------------------------------------------------------------------------
# Model switching
# ---------------------------------------------------------------------------

def test_set_model_rejects_unknown_provider(api_client, fake_provider):
    response = api_client.post("/llm/model", json={"provider": "ghost", "model": "m"})

    assert response.status_code == 404


def test_set_model_rejects_unavailable_provider(api_client, register_provider):
    register_provider(FakeProvider(available=False), "unavailable")

    response = api_client.post(
        "/llm/model", json={"provider": "unavailable", "model": "fake-model"}
    )

    assert response.status_code == 400


def test_set_model_rejects_a_model_that_is_not_downloaded(api_client, fake_provider):
    response = api_client.post("/llm/model", json={"provider": "fake", "model": "ghost"})

    assert response.status_code == 404


def test_set_model_accepts_a_valid_selection(api_client, fake_provider):
    response = api_client.post(
        "/llm/model", json={"provider": "fake", "model": "fake-model"}
    )

    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert response.json()["active"] == {"provider": "fake", "model": "fake-model"}


# ---------------------------------------------------------------------------
# Chat
# ---------------------------------------------------------------------------

def test_chat_rejects_a_missing_message(api_client):
    assert api_client.post("/chat", json={}).status_code == 422
    assert api_client.post("/chat", json={"wrong": "field"}).status_code == 422


def test_chat_maps_valueerror_to_400(api_client, monkeypatch):
    def boom(message, model=None, provider_id=None):
        raise ValueError("bad provider")

    monkeypatch.setattr(app_module, "handle_chat_interaction", boom)

    response = api_client.post("/chat", json={"message": "hi"})

    assert response.status_code == 400
    assert "bad provider" in response.json()["detail"]


def test_chat_maps_backend_failure_to_503(api_client, monkeypatch):
    def boom(message, model=None, provider_id=None):
        raise requests.exceptions.ConnectionError("no ollama")

    monkeypatch.setattr(app_module, "handle_chat_interaction", boom)

    response = api_client.post("/chat", json={"message": "hi"})

    assert response.status_code == 503


# ---------------------------------------------------------------------------
# Training / evaluation
# ---------------------------------------------------------------------------

def test_train_returns_valid_tickers(api_client, monkeypatch):
    monkeypatch.setattr(app_module, "train_model", lambda **kwargs: (None, ["AAPL"]))

    response = api_client.post("/train", json={"model_name": "unit_model"})

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert body["model_name"] == "unit_model"
    assert body["valid_tickers"] == ["AAPL"]


def test_train_maps_failure_to_500(api_client, monkeypatch):
    def boom(**kwargs):
        raise RuntimeError("training exploded")

    monkeypatch.setattr(app_module, "train_model", boom)

    response = api_client.post("/train", json={"model_name": "unit_model"})

    assert response.status_code == 500
    assert "training exploded" in response.json()["detail"]


def test_evaluate_returns_the_generated_payload(api_client, monkeypatch, tmp_path):
    json_path = tmp_path / "recommendations.json"
    payload = {
        "budget": 5000.0,
        "cash_remaining": 4171.08,
        "eval_period": "2025-01-01 -> 2026-06-01",
        "backtest_summary": {
            "rl_return_pct": 40.08,
            "bh_return_pct": 40.12,
            "sharpe": 1.45,
            "max_drawdown_pct": 17.88,
        },
        "allocations": [],
    }
    monkeypatch.setattr(app_module, "load_trained_model", lambda name: object())
    monkeypatch.setattr(
        app_module, "generate_recommendations", lambda **kwargs: (json_path, payload)
    )

    response = api_client.post("/evaluate", json={"model_name": "unit_model"})

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert body["json_path"] == str(json_path)
    assert body["data"] == payload


def test_evaluate_unknown_model_reports_an_error(api_client, monkeypatch):
    """Unknown models report an error, but the broad ``except`` re-wraps the
    intended 404 as a 500 - this pins the current behaviour."""
    monkeypatch.setattr(app_module, "load_trained_model", lambda name: None)

    response = api_client.post("/evaluate", json={"model_name": "ghost"})

    assert response.status_code == 500
    assert "not found" in response.json()["detail"]


def test_evaluate_maps_failure_to_500(api_client, monkeypatch):
    def boom(name):
        raise RuntimeError("evaluation exploded")

    monkeypatch.setattr(app_module, "load_trained_model", boom)

    response = api_client.post("/evaluate", json={"model_name": "unit_model"})

    assert response.status_code == 500
    assert "evaluation exploded" in response.json()["detail"]


# ---------------------------------------------------------------------------
# Recommendation formatter fallback
# ---------------------------------------------------------------------------

def test_generate_recommendation_formats_allocations(monkeypatch):
    from llm.main import Explanation, Recommendation

    explanation = Recommendation(
        budget=5000.0,
        cash_remaining=3000.0,
        eval_period="2025-01-01 -> 2025-06-01",
        backtest_summary={},
        allocations=[Explanation("NVDA", "BUY", "cheap relative to momentum")],
    )
    monkeypatch.setattr(app_module, "generate_explanation", lambda name: explanation)

    text = app_module.generate_recommendation()

    assert "**NVDA** (BUY): cheap relative to momentum" in text


def test_generate_recommendation_falls_back_on_empty_allocations(monkeypatch):
    from llm.main import Recommendation

    explanation = Recommendation(
        budget=5000.0,
        cash_remaining=5000.0,
        eval_period="2025-01-01 -> 2025-06-01",
        backtest_summary={},
        allocations=[],
    )
    monkeypatch.setattr(app_module, "generate_explanation", lambda name: explanation)

    assert app_module.generate_recommendation() == "Failed to generate explanation list"


def test_tickers_constant_is_still_the_default_universe():
    assert TICKERS == ["AAPL", "MSFT", "NVDA"]
