"""Prompt attribution: each subsystem must send its own system prompt.

The FakeProvider records every ``chat()`` call, so these tests assert *which*
system prompt (and temperature) each feature sends - chat, recommendations,
guide and flashcards must not bleed into one another.
"""

import json

from _schema import assert_valid_recommendations_payload
from llm.learn import (
    FLASHCARD_SYSTEM_PROMPT,
    FLASHCARD_TEMPERATURE,
    GUIDE_SYSTEM_PROMPT,
    GUIDE_TEMPERATURE,
    generate_flashcards,
    generate_guide,
)
from llm.main import SYSTEM_PROMPTS, generate_explanation, handle_chat_interaction

GUIDE_PAYLOAD = {
    "title": "RSI",
    "summary": "Relative strength index explained.",
    "steps": [{"title": "What RSI measures", "content": "It measures momentum."}],
    "key_takeaways": ["RSI ranges from 0 to 100."],
    "grounded": True,
}

CARDS_PAYLOAD = {
    "cards": [{"front": "What is RSI?", "back": "A momentum oscillator."}]
}

ALLOCATION = {
    "ticker": "NVDA",
    "action": "BUY",
    "price": 210.89,
    "shares": 3.9305,
    "dollar_value": 828.92,
    "pct_of_budget": 16.6,
    "rsi": 46.3,
    "macd_hist": -2.1629,
    "bb_pct": 0.391,
}

RECOMMENDATIONS_PAYLOAD = {
    "budget": 5000.0,
    "cash_remaining": 4171.08,
    "eval_period": "2025-01-01 -> 2026-06-01",
    "backtest_summary": {
        "rl_return_pct": 40.08,
        "bh_return_pct": 40.12,
        "sharpe": 1.45,
        "max_drawdown_pct": 17.88,
    },
    "allocations": [ALLOCATION],
}


# ---------------------------------------------------------------------------
# Function-level attribution
# ---------------------------------------------------------------------------

def test_chat_helper_uses_the_chat_system_prompt(fake_provider):
    fake_provider.replies = ["teaching answer"]

    handle_chat_interaction("What is an ETF?")

    call = fake_provider.calls[-1]
    assert call["system_prompt"] == SYSTEM_PROMPTS["CHAT"]
    assert call["user_prompt"] == "What is an ETF?"


def test_guide_uses_the_guide_prompt_and_low_temperature(fake_provider):
    fake_provider.replies = [json.dumps(GUIDE_PAYLOAD)]

    generate_guide("RSI", reference_material=[])

    call = fake_provider.calls[-1]
    assert call["system_prompt"] == GUIDE_SYSTEM_PROMPT
    assert call["temperature"] == GUIDE_TEMPERATURE
    assert call["temperature"] < 0.7  # low temperature keeps grounded guides stable


def test_flashcards_use_the_flashcard_prompt(fake_provider):
    fake_provider.replies = [json.dumps(CARDS_PAYLOAD)]

    generate_flashcards("RSI", count=5)

    call = fake_provider.calls[-1]
    assert call["system_prompt"] == FLASHCARD_SYSTEM_PROMPT
    assert call["temperature"] == FLASHCARD_TEMPERATURE


def test_explanations_use_the_recommendations_prompt(fake_provider, isolated_output_dir):
    (isolated_output_dir / "recommendations.json").write_text(
        json.dumps(RECOMMENDATIONS_PAYLOAD), encoding="utf-8"
    )
    fake_provider.replies = ["NVDA looks attractive because RSI is mid-range."]

    recommendation = generate_explanation("recommendations.json")

    assert len(fake_provider.calls) == 1
    call = fake_provider.calls[0]
    assert call["system_prompt"] == SYSTEM_PROMPTS["RECOMMENDATIONS"]
    assert "NVDA" in call["user_prompt"]
    assert "BUY" in call["user_prompt"]
    assert recommendation.allocations[0].ticker == "NVDA"
    assert (
        recommendation.allocations[0].justification
        == "NVDA looks attractive because RSI is mid-range."
    )


# ---------------------------------------------------------------------------
# Endpoint-level attribution (the surface the frontend hits)
# ---------------------------------------------------------------------------

def test_chat_endpoint_uses_the_chat_system_prompt(api_client, fake_provider):
    fake_provider.replies = ["endpoint answer"]

    response = api_client.post("/chat", json={"message": "hi"})

    assert response.status_code == 200
    assert response.json() == {"reply": "endpoint answer"}
    assert fake_provider.calls[-1]["system_prompt"] == SYSTEM_PROMPTS["CHAT"]


def test_guide_endpoint_uses_the_guide_system_prompt(
    api_client, fake_provider, monkeypatch
):
    monkeypatch.setattr("llm.learn.fetch_reference_material", lambda topic: [])
    fake_provider.replies = [json.dumps(GUIDE_PAYLOAD)]

    response = api_client.post("/learn/guide", json={"topic": "RSI"})

    assert response.status_code == 200
    assert fake_provider.calls[-1]["system_prompt"] == GUIDE_SYSTEM_PROMPT


def test_flashcards_endpoint_uses_the_flashcard_system_prompt(api_client, fake_provider):
    fake_provider.replies = [json.dumps(CARDS_PAYLOAD)]

    response = api_client.post("/learn/flashcards", json={"topic": "RSI", "count": 5})

    assert response.status_code == 200
    assert fake_provider.calls[-1]["system_prompt"] == FLASHCARD_SYSTEM_PROMPT


def test_recommendation_payload_used_here_is_itself_valid():
    """Guard the fixture above against drifting away from the real schema."""
    assert_valid_recommendations_payload(RECOMMENDATIONS_PAYLOAD)
