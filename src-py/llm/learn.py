"""
Learn feature: LLM-driven educational content generation.

- generate_guide: a step-by-step guide grounded in retrieved reference
  material (RAG-style) for accuracy and low divergence between runs.
- generate_flashcards: question/answer pairs for a topic

DISCLAIMER: Core functionality was created using Generative AI due to
time constraints following the delayed user surveys. This permits more
appropriate evaluation and fulfilling of the goals set forth in the
project's scope.
"""

import json
import re
from typing import Any

from llm.main import chat
from llm.retrieval import fetch_reference_material, format_reference_block

# Low temperature: grounding + low temperature = minimal divergence between regenerations
GUIDE_TEMPERATURE = 0.3
FLASHCARD_TEMPERATURE = 0.5

GUIDE_SYSTEM_PROMPT = """You are a financial education author writing short, step-by-step lessons.
You will receive a topic and numbered reference material.

Rules:
- Teach STEP BY STEP: each step introduces ONE idea, in the order a beginner needs it.
- Use ONLY facts present in the reference material. Do not invent numbers, dates, or formulas.
- If the reference material is insufficient for some part, cover what you can and note the gap in that step's content.
- Define any jargon the first time it appears.
- Prefer concrete examples over abstract statements.
- Keep language simple: the reader is not a finance expert.
- Output ONLY valid JSON. No markdown fences, no commentary.

JSON shape (all keys required):
{
  "title": "short lesson title",
  "summary": "2-3 sentence overview",
  "steps": [
    {"title": "step title", "content": "3-8 sentences teaching this step. May use markdown lists/bold for readability."}
  ],
  "key_takeaways": ["short takeaway 1", "short takeaway 2", "..."],
  "grounded": true/false
}
Set "grounded" to true only if the steps rely on the reference material; false if you had to rely on your own knowledge."""

FLASHCARD_SYSTEM_PROMPT = """You are a financial education author creating study flashcards.
Rules:
- Each card tests ONE concept: a definition, an interpretation, or a common pitfall.
- Fronts are short questions or prompts; backs are concise answers (1-3 sentences).
- Output ONLY valid JSON. No markdown fences, no commentary.

JSON shape:
{"cards": [{"front": "question", "back": "answer"}, ...]}"""


def _extract_json(text: str) -> str:
    """
    Pull a JSON object/array out of an LLM reply.
    """
    text = text.strip()
    # Prefer fenced blocks when present.
    fence = re.search(r"```(?:json)?\s*(.*?)```", text, flags=re.DOTALL)
    if fence:
        text = fence.group(1).strip()

    for opener, closer in (("{", "}"), ("[", "]")):
        start = text.find(opener)
        if start == -1:
            continue
        depth = 0
        in_string = False
        escape = False
        for i in range(start, len(text)):
            ch = text[i]
            if escape:
                escape = False
                continue
            if ch == "\\":
                escape = True
                continue
            if ch == '"':
                in_string = not in_string
                continue
            if in_string:
                continue
            if ch == opener:
                depth += 1
            elif ch == closer:
                depth -= 1
                if depth == 0:
                    return text[start : i + 1]
        # Unbalanced - try the next opener type.
    raise ValueError("The model did not return valid JSON. Try again or pick another model.")


def _parse_json_reply(raw: str) -> Any:
    try:
        return json.loads(_extract_json(raw))
    except json.JSONDecodeError as e:
        raise ValueError(
            f"The model's reply was not parseable JSON ({e}). Try again or pick another model."
        ) from e


def _validate_guide(data: Any) -> dict[str, Any]:
    if not isinstance(data, dict):
        raise TypeError("Guide JSON must be an object.")
    steps = data.get("steps")
    if not isinstance(steps, list) or len(steps) == 0:
        raise ValueError("Guide JSON must contain a non-empty 'steps' array.")

    cleaned_steps = []
    for s in steps:
        if not isinstance(s, dict) or not s.get("title") or not s.get("content"):
            raise ValueError("Each guide step needs 'title' and 'content'.")
        cleaned_steps.append(
            {"title": str(s["title"]), "content": str(s["content"])}
        )

    takeaways = data.get("key_takeaways", [])
    if not isinstance(takeaways, list):
        takeaways = []

    return {
        "title": str(data.get("title") or "Untitled guide"),
        "summary": str(data.get("summary") or ""),
        "steps": cleaned_steps,
        "key_takeaways": [str(t) for t in takeaways if str(t).strip()],
        "grounded": bool(data.get("grounded", False)),
    }


def generate_guide(
    topic: str,
    reference_material: list[dict[str, Any]] | None = None,
    model: str | None = None,
    provider_id: str | None = None,
) -> dict[str, Any]:
    """
    Generate a step-by-step guide for a topic, grounded in reference material.
    """
    topic = (topic or "").strip()
    if not topic:
        raise ValueError("Topic is required.")

    sources = (
        reference_material
        if reference_material is not None
        else fetch_reference_material(topic)
    )
    reference_block = format_reference_block(sources)

    if reference_block:
        user_prompt = f"""Topic: {topic}

Reference material:
{reference_block}

Write the step-by-step lesson for this topic based on the reference material above.
Output only the JSON object."""
    else:
        user_prompt = f"""Topic: {topic}

No reference material could be retrieved. Write the lesson from your own knowledge,
be conservative: stick to well-established concepts and avoid specific figures.
Output only the JSON object."""

    raw = chat(
        GUIDE_SYSTEM_PROMPT,
        user_prompt,
        model=model,
        provider_id=provider_id,
        temperature=GUIDE_TEMPERATURE,
    )
    guide = _validate_guide(_parse_json_reply(raw))

    # Fallback: if the model claims grounded but retrieval failed (or vice
    # versa), trust the retrieval result for the flag we show the user.
    guide["grounded"] = bool(sources) and bool(guide["grounded"])
    guide["sources"] = sources
    return guide


def _validate_flashcards(data: Any) -> list[dict[str, str]]:
    cards = data.get("cards") if isinstance(data, dict) else data
    if not isinstance(cards, list) or len(cards) == 0:
        raise ValueError("Flashcard JSON must contain a non-empty 'cards' array.")
    cleaned = []
    for c in cards:
        if not isinstance(c, dict) or not c.get("front") or not c.get("back"):
            raise ValueError("Each flashcard needs 'front' and 'back'.")
        cleaned.append({"front": str(c["front"]), "back": str(c["back"])})
    return cleaned


def generate_flashcards(
    topic: str,
    count: int = 10,
    model: str | None = None,
    provider_id: str | None = None,
) -> list[dict[str, str]]:
    """Generate `count` question/answer flashcards for a topic."""
    topic = (topic or "").strip()
    if not topic:
        raise ValueError("Topic is required.")
    count = max(3, min(int(count or 10), 25))

    user_prompt = f"""Topic: {topic}

Create {count} flashcards for studying this topic.
Mix question types: definitions, how-to-interpret, and common mistakes.
Output only the JSON object."""

    raw = chat(
        FLASHCARD_SYSTEM_PROMPT,
        user_prompt,
        model=model,
        provider_id=provider_id,
        temperature=FLASHCARD_TEMPERATURE,
    )
    return _validate_flashcards(_parse_json_reply(raw))
