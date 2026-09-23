"""llm package: parameter validation, documented errors and fallback values."""

import json

import pytest

import llm.main as llm_main
from _fakes import FakeProvider
from llm.learn import (
    _extract_json,
    _parse_json_reply,
    _validate_flashcards,
    _validate_guide,
    generate_flashcards,
    generate_guide,
)
from llm.retrieval import fetch_reference_material


# ---------------------------------------------------------------------------
# Provider / model selection
# ---------------------------------------------------------------------------

def test_set_active_rejects_unknown_provider():
    with pytest.raises(KeyError):
        llm_main.set_active("no-such-provider", "fake-model")


def test_set_active_rejects_unavailable_provider(register_provider):
    register_provider(FakeProvider(available=False), "unavailable")

    with pytest.raises(ValueError, match="not available"):
        llm_main.set_active("unavailable", "fake-model")


def test_set_active_rejects_model_that_is_not_downloaded(fake_provider):
    with pytest.raises(LookupError, match="not downloaded"):
        llm_main.set_active("fake", "ghost-model")


def test_set_active_stores_a_valid_selection(fake_provider):
    active = llm_main.set_active("fake", "fake-model")

    assert active == {"provider": "fake", "model": "fake-model"}
    assert llm_main.get_active() == active


def test_list_models_rejects_unavailable_provider(register_provider):
    register_provider(FakeProvider(available=False), "unavailable")

    with pytest.raises(ValueError):
        llm_main.list_models("unavailable")


def test_chat_requires_a_resolved_model(fake_provider, monkeypatch):
    monkeypatch.setattr(llm_main, "active_model", "")

    with pytest.raises(ValueError, match="No model selected"):
        llm_main.chat("system", "user")


# ---------------------------------------------------------------------------
# Guide / flashcard validators
# ---------------------------------------------------------------------------

def test_validate_guide_rejects_non_object_payload():
    with pytest.raises(TypeError):
        _validate_guide(["not", "a", "dict"])


def test_validate_guide_requires_at_least_one_step():
    with pytest.raises(ValueError, match="steps"):
        _validate_guide({"title": "t", "steps": []})


def test_validate_guide_requires_title_and_content_per_step():
    with pytest.raises(ValueError, match="title"):
        _validate_guide({"steps": [{"title": "only a title"}]})

    with pytest.raises(ValueError, match="content"):
        _validate_guide({"steps": [{"title": "t", "content": ""}]})


def test_validate_guide_falls_back_to_defaults():
    """Missing/invalid optional fields must not blow up - they fall back."""
    guide = _validate_guide(
        {
            "steps": [{"title": "a", "content": "b"}],
            "key_takeaways": "not-a-list",
        }
    )

    assert guide["title"] == "Untitled guide"
    assert guide["summary"] == ""
    assert guide["key_takeaways"] == []
    assert guide["grounded"] is False


def test_validate_flashcards_requires_non_empty_cards():
    with pytest.raises(ValueError, match="cards"):
        _validate_flashcards({"cards": []})


def test_validate_flashcards_requires_both_sides():
    with pytest.raises(ValueError, match="front"):
        _validate_flashcards({"cards": [{"front": "q"}]})

    with pytest.raises(ValueError, match="back"):
        _validate_flashcards({"cards": [{"front": "q", "back": ""}]})


def test_validate_flashcards_accepts_a_bare_list():
    assert _validate_flashcards([{"front": "q", "back": "a"}]) == [
        {"front": "q", "back": "a"}
    ]


# ---------------------------------------------------------------------------
# JSON extraction / parsing
# ---------------------------------------------------------------------------

def test_extract_json_reads_a_fenced_block():
    assert _extract_json('prefix\n```json\n{"a": 1}\n```\nsuffix') == '{"a": 1}'


def test_extract_json_reads_a_bare_object_from_prose():
    assert _extract_json('Sure: {"a": 1} done') == '{"a": 1}'


def test_extract_json_ignores_braces_inside_strings():
    text = '{"a": "value with } brace"}'

    assert _extract_json(text) == text


def test_extract_json_without_json_raises_valueerror():
    with pytest.raises(ValueError, match="valid JSON"):
        _extract_json("no structured output here")


def test_parse_json_reply_with_malformed_json_raises_valueerror():
    with pytest.raises(ValueError, match="parseable"):
        _parse_json_reply('{"a": 1,}')


# ---------------------------------------------------------------------------
# Generation parameters
# ---------------------------------------------------------------------------

def test_generate_flashcards_requires_a_topic(fake_provider):
    with pytest.raises(ValueError, match="Topic is required"):
        generate_flashcards("   ")


def test_generate_guide_requires_a_topic(fake_provider):
    with pytest.raises(ValueError, match="Topic is required"):
        generate_guide("")


def test_generate_flashcards_clamps_a_too_small_count(fake_provider):
    fake_provider.replies = [json.dumps({"cards": [{"front": "q", "back": "a"}]})]

    generate_flashcards("ETFs", count=1)

    assert "Create 3 flashcards" in fake_provider.calls[-1]["user_prompt"]


def test_generate_flashcards_clamps_a_too_large_count(fake_provider):
    fake_provider.replies = [json.dumps({"cards": [{"front": "q", "back": "a"}]})]

    generate_flashcards("ETFs", count=999)

    assert "Create 25 flashcards" in fake_provider.calls[-1]["user_prompt"]


def test_generate_guide_grounding_requires_sources(fake_provider):
    """The model claiming grounded=True must not win over an empty retrieval."""
    fake_provider.replies = [
        json.dumps(
            {
                "title": "t",
                "summary": "s",
                "steps": [{"title": "a", "content": "b"}],
                "key_takeaways": [],
                "grounded": True,
            }
        )
    ]

    guide = generate_guide("RSI", reference_material=[])

    assert guide["grounded"] is False
    assert guide["sources"] == []


def test_generate_guide_attaches_sources(fake_provider):
    sources = [{"title": "RSI", "url": "https://example.test/rsi", "extract": "x" * 200}]
    fake_provider.replies = [
        json.dumps(
            {
                "title": "t",
                "summary": "s",
                "steps": [{"title": "a", "content": "b"}],
                "key_takeaways": [],
                "grounded": True,
            }
        )
    ]

    guide = generate_guide("RSI", reference_material=sources)

    assert guide["sources"] == sources
    assert guide["grounded"] is True


def test_generate_guide_defaults_to_retrieval_when_none_is_supplied(
    fake_provider, monkeypatch
):
    retrieved = []
    monkeypatch.setattr(
        "llm.learn.fetch_reference_material",
        lambda topic: retrieved.append(topic) or [],
    )
    fake_provider.replies = [
        json.dumps(
            {
                "title": "t",
                "summary": "s",
                "steps": [{"title": "a", "content": "b"}],
                "key_takeaways": [],
                "grounded": False,
            }
        )
    ]

    generate_guide("RSI")

    assert retrieved == ["RSI"]


# ---------------------------------------------------------------------------
# Retrieval fallback
# ---------------------------------------------------------------------------

def test_fetch_reference_material_returns_empty_for_a_blank_topic():
    assert fetch_reference_material("") == []
    assert fetch_reference_material("   ") == []
