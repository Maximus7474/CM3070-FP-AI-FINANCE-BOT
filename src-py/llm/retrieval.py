"""
Retrieval layer for the Learn page.

Fetches external reference material (currently Wikipedia) so that LLM
guide generation can be grounded in real sources instead of pure model
memory. This keeps step-by-step guides accurate and reduces divergence
between regenerations of the same topic.

DISCLAIMER: Core functionality was created using Generative AI due to
time constraints following the delayed user surveys. This permits more
appropriate evaluation and fulfilling of the goals set forth in the
project's scope.
"""

import re
from typing import Any

import requests

WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php"
USER_AGENT = "FinancialAdvisorApp/0.1 (learn feature; local desktop app)"

# Per-source and total character budgets (keeps context small-model friendly).
PER_SOURCE_CHAR_BUDGET = 2_000
TOTAL_CHAR_BUDGET = 6_000

MAX_SOURCES = 3

# Finance topics are often known by acronym - map common ones to the
# article titles Wikipedia actually uses.
TOPIC_QUERY_OVERRIDES: dict[str, str] = {
    "rsi": "Relative strength index",
    "macd": "MACD",
    "bollinger bands": "Bollinger Bands",
    "bb": "Bollinger Bands",
    "p/e": "Price–earnings ratio",
    "pe ratio": "Price–earnings ratio",
    "p/e ratio": "Price–earnings ratio",
    "dca": "Dollar cost averaging",
    "dollar-cost averaging": "Dollar cost averaging",
    "etf": "Exchange-traded fund",
    "etfs": "Exchange-traded fund",
    "ema": "Moving average",
    "sma": "Moving average",
    "cagr": "Compound annual growth rate",
    "div yield": "Dividend yield",
    "eps": "Earnings per share",
    "yolo": "Year-over-year",
}

_WIKI_URL_CACHE: dict[str, str] = {}


def _clean_extract(text: str) -> str:
    """Strip typical Wikipedia boilerplate noise from a plain-text extract."""
    # Collapse excessive whitespace/newlines.
    text = re.sub(r"\n{2,}", "\n", text or "")
    text = re.sub(r"[ \t]{2,}", " ", text)
    # Drop common list/annotation artifacts.
    text = re.sub(r"^\s*[•\-]\s*", "", text, flags=re.MULTILINE)
    return text.strip()


def _search_titles(query: str, limit: int = MAX_SOURCES + 2) -> list[str]:
    """Opensearch: returns titles best matching the query."""
    resp = requests.get(
        WIKIPEDIA_API,
        params={
            "action": "opensearch",
            "search": query,
            "limit": limit,
            "namespace": 0,
            "format": "json",
        },
        headers={"User-Agent": USER_AGENT},
        timeout=8,
    )
    resp.raise_for_status()
    data = resp.json()
    # opensearch returns [query, [titles], [descriptions], [urls]]
    titles = data[1] if len(data) > 1 else []
    return list(titles)


def _fetch_extract(title: str) -> dict[str, Any] | None:
    """Plain-text extract for a single article title."""
    resp = requests.get(
        WIKIPEDIA_API,
        params={
            "action": "query",
            "prop": "extracts",
            "explaintext": 1,
            "redirects": 1,
            "titles": title,
            "format": "json",
            "formatversion": 2,
        },
        headers={"User-Agent": USER_AGENT},
        timeout=8,
    )
    resp.raise_for_status()
    pages = resp.json().get("query", {}).get("pages", [])
    if not pages:
        return None
    page = pages[0]
    if page.get("missing") or not page.get("extract"):
        return None

    title = page.get("title", title)
    extract = _clean_extract(page["extract"])
    url = _WIKI_URL_CACHE.get(title) or (
        f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}"
    )
    return {"title": title, "url": url, "extract": extract}


def fetch_reference_material(topic: str) -> list[dict[str, Any]]:
    """
    Retrieve reference material for a topic.

    Returns an empty list on any failure
    """
    topic = (topic or "").strip()
    if not topic:
        return []

    query = TOPIC_QUERY_OVERRIDES.get(topic.lower(), topic)

    try:
        titles = _search_titles(query)
    except Exception:  # noqa: BLE001 - retrieval must never crash generation
        return []

    sources: list[dict[str, Any]] = []
    used_chars = 0

    for title in titles:
        if len(sources) >= MAX_SOURCES or used_chars >= TOTAL_CHAR_BUDGET:
            break
        try:
            source = _fetch_extract(title)
        except Exception:  # noqa: BLE001 - skip broken sources, keep going
            continue
        if not source:
            continue

        remaining_budget = TOTAL_CHAR_BUDGET - used_chars
        extract = source["extract"][: min(PER_SOURCE_CHAR_BUDGET, remaining_budget)]
        if len(extract) < 120:
            continue  # skip trivially short extracts

        source["extract"] = extract
        used_chars += len(extract)
        sources.append(source)

    return sources


def format_reference_block(sources: list[dict[str, Any]]) -> str:
    """Render retrieved sources as a numbered reference block for the prompt."""
    if not sources:
        return ""
    parts = []
    for i, s in enumerate(sources, start=1):
        parts.append(f'[{i}] "{s["title"]}"\n{s["extract"]}')
    return "\n\n".join(parts)
