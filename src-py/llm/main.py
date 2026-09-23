import json
from typing import Any, Dict, List, Optional

from config import OUTPUT_DIR
from quiz.main import build_review_prompt
from llm.providers import (
    DEFAULT_OLLAMA_MODEL,
    get_provider,
)

# Default active provider/model (used until the user picks something else
# in settings, or the frontend re-applies a saved choice at launch).
DEFAULT_PROVIDER = "ollama"

# Runtime state for the active provider/model.
active_provider_id: str = DEFAULT_PROVIDER
active_model: str = DEFAULT_OLLAMA_MODEL


def initialize_ollama() -> None:
    """
    Best-effort startup for the default provider.

    Never raises: a missing/down Ollama server must not crash the app,
    the settings UI reports availability and the user manages models
    from there.
    """
    try:
        provider = get_provider(DEFAULT_PROVIDER)
        provider.start()
        print(f"[LLM] Provider '{provider.display_name}' is ready.")
    except Exception as e:  # noqa: BLE001 - startup must not crash the app
        print(f"[LLM] Provider '{DEFAULT_PROVIDER}' unavailable at startup: {e}")


def get_active() -> Dict[str, str]:
    """Currently selected provider and model."""
    return {"provider": active_provider_id, "model": active_model}


def set_active(provider_id: str, model: str) -> Dict[str, str]:
    """
    Switch the active provider/model at runtime.

    Raises KeyError for unknown providers, ValueError for providers that
    are not wired up yet, LookupError when the model is not downloaded.
    """
    global active_provider_id, active_model

    provider = get_provider(provider_id)  # KeyError
    if not provider.available:
        hint = f" {provider.setup_hint}" if provider.setup_hint else ""
        raise ValueError(f"Provider '{provider.display_name}' is not available yet.{hint}")

    # Try to make sure the backend is reachable before validating the model.
    provider.start()  # may raise FileNotFoundError/RuntimeError

    if not provider.has_model(model):  # may raise ConnectionError
        raise LookupError(
            f"Model '{model}' is not downloaded. Run: ollama pull {model}"
        )

    active_provider_id = provider_id
    active_model = model
    return get_active()


def list_models(provider_id: str = DEFAULT_PROVIDER) -> List[Dict[str, Any]]:
    """Models available for a given provider (raises for stub providers)."""
    provider = get_provider(provider_id)
    if not provider.available:
        hint = f" {provider.setup_hint}" if provider.setup_hint else ""
        raise ValueError(f"Provider '{provider.display_name}' is not available yet.{hint}")
    return provider.list_models()


def _resolve_provider(provider_id: Optional[str]):
    pid = provider_id or active_provider_id
    provider = get_provider(pid)
    if not provider.available:
        hint = f" {provider.setup_hint}" if provider.setup_hint else ""
        raise ValueError(f"Provider '{provider.display_name}' is not available yet.{hint}")
    return pid, provider


def chat(
    system_prompt: str,
    user_prompt: str,
    model: Optional[str] = None,
    provider_id: Optional[str] = None,
    temperature: float = 0.7,
    stream: bool = False,
) -> str:
    """
    Route a single chat request through the active (or explicitly chosen)
    provider/model.
    """
    pid, provider = _resolve_provider(provider_id)
    if pid == active_provider_id:
        mdl = model or active_model
    else:
        mdl = model

    if not mdl:
        raise ValueError("No model selected. Pick one in Settings -> LLM Provider.")

    # Make sure the backend is reachable (no-op / cheap when it already is).
    provider.start()  # may raise FileNotFoundError/RuntimeError

    return provider.chat(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        model=mdl,
        temperature=temperature,
        stream=stream,
    )


# ---------------------------------------------------------------------------
# Guidance helper, prompts the system with rules and conditions it needs
# to follow. Helps us avoid out of context or inaccuracies
# ---------------------------------------------------------------------------
SYSTEM_PROMPTS = {
    "RECOMMENDATIONS": """You are a financial explanation assistant embedded in a
self-hosted advisor app. Your job is to explain WHY a stock recommendation
was made, using ONLY the data provided to you in the user message.

Rules:
- Do not invent numbers or facts not present in the supplied data.
- Be clear and concise; assume the user is not a finance expert.
- Utilize the Technical Indicators provided (RSI, MACD Histogram, Bollinger Bands % or bb_pct) to explain the trading signals.
- Always mention key risks or counterpoints, not just the bullish case.
- Never present this as guaranteed financial advice.
- If the supplied data is insufficient to justify the recommendation,
    say so explicitly rather than filling gaps with assumptions.
""",
    "CHAT": """You are a financial education assistant.
Your role is to help users understand investing and stock market concepts. Teach like an experienced tutor: adapt explanations to the user's knowledge level, define unfamiliar terms, explain concepts step by step, and use analogies and examples when helpful.
You may explain topics including stocks, ETFs, market mechanics, technical analysis, fundamental analysis, indicators, chart patterns, valuation metrics, risk management, and portfolio concepts.

When explaining technical indicators:
- Explain what the indicator measures.
- Explain how traders commonly interpret it.
- Explain its limitations.
- Emphasize that no single indicator should be used in isolation.

When discussing a specific stock:
- Explain what available indicators or financial metrics may suggest.
- Describe common interpretations used by investors.
- Present bullish and bearish perspectives when appropriate.
- Never recommend buying, selling, or holding.
- Never predict future prices or returns.
- Never provide personalized financial advice.

If asked for investment advice, explain that you can teach the concepts, interpret market data, and discuss strategies, but investment decisions are the user's responsibility.
If information is missing or uncertain, say so instead of guessing.
Your goal is to help users become informed and independent learners.
""",
    "QUIZ_REVIEW": """You are an assessment reviewer for a self-hosted financial education app.
You will be given a quiz generated from a reinforcement-learning (RL) trading agent's output, the user's answers, and the correct answers.

Review each answer:
- For multiple-choice questions, mark the answer correct or incorrect against the supplied correct_answer.
- For open-ended questions, assess whether the explanation is reasonable and grounded in the provided technical indicators.
- Keep feedback concise and constructive. Do not provide financial advice.

Return ONLY a valid JSON object (no markdown fences, no commentary) with exactly this schema:
{
  "reviews": [
    {"question_id": "...", "correct": true, "feedback": "..."}
  ],
  "overall_feedback": "...",
  "score": 0,
  "total": 0
}

Scoring: award 1 point per correct multiple-choice answer and 0-2 points per open-ended answer based on quality. Set "total" to the maximum points available across all questions.
""",
}


def build_user_prompt(allocation_data: dict, portfolio_context: dict) -> str:
    """
    Formats technical metrics and overarching portfolio data for the LLM.
    """
    combined_data = {
        "ticker_metrics": allocation_data,
        "portfolio_context": portfolio_context
    }

    data_block = json.dumps(combined_data, indent=2)

    return f"""Stock: {allocation_data['ticker']}
Recommendation: {allocation_data['action']}

Supporting data and portfolio context:
{data_block}

Explain this recommendation to the user in plain language, explicitly referencing
the technical indicator data points (like RSI, MACD history, or Bollinger Bands) and how they
justify the action within the overall portfolio budget strategy."""

class Explanation:
    def __init__(self, ticker: str, action: str, justification: str):
        self.ticker = ticker
        self.action = action
        self.justification = justification

    def to_dict(self) -> Dict[str, str]:
        return {
            "ticker": self.ticker,
            "action": self.action,
            "justification": self.justification,
        }

class Recommendation:
    def __init__(self, budget: int, cash_remaining: int, eval_period: int, backtest_summary: Dict[str, int], allocations: List[Explanation]):
        self.budget = budget
        self.cash_remaining = cash_remaining
        self.eval_period = eval_period
        self.backtest_summary = backtest_summary
        self.allocations = allocations

    def to_dict(self) -> Dict[str, Any]:
        return {
            "budget": self.budget,
            "cash_remaining": self.cash_remaining,
            "eval_period": self.eval_period,
            "backtest_summary": self.backtest_summary,
            "allocations": [alloc.to_dict() for alloc in self.allocations],
        }

def generate_explanation(file_name: str) -> Recommendation:
    json_path = OUTPUT_DIR / file_name

    if not json_path.exists():
        raise FileNotFoundError(f"Error: Could not find JSON file at: {json_path}")

    with open(json_path, "r") as f:
        recommendations_data = json.load(f) # as JsonRecommendation

    # extract global metrics to provide context to the agent
    portfolio_context = {
        "total_budget": recommendations_data.get("budget"),
        "cash_remaining": recommendations_data.get("cash_remaining"),
        "eval_period": recommendations_data.get("eval_period"),
        "backtest_summary": recommendations_data.get("backtest_summary")
    }

    # print(f"\n--- Generating Explanations from {file_name} ---\n")

    response = []

    for allocation in recommendations_data.get("allocations", []):
        ticker = allocation.get("ticker")
        action = allocation.get("action")

        print(f"Processing explanation for {ticker} ({action})...")

        user_prompt = build_user_prompt(allocation, portfolio_context)
        explanation = chat(SYSTEM_PROMPTS["RECOMMENDATIONS"], user_prompt)

        response.append(Explanation(ticker, action, explanation))

    data = recommendations_data.copy()
    data["allocations"] = response

    return Recommendation(**data)

def handle_chat_interaction(
    user_question: str,
    model: Optional[str] = None,
    provider_id: Optional[str] = None,
) -> str:
    """
    Receives questions from a user and processes them using the CHAT rules.
    """
    return chat(
        SYSTEM_PROMPTS["CHAT"],
        user_question,
        model=model,
        provider_id=provider_id,
    )

def review_quiz_answers(
    questions: list[dict],
    answers: list[dict],
    model: Optional[str] = None,
    provider_id: Optional[str] = None,
) -> dict[str, Any]:
    """
    Sends the quiz, correct answers, and the user's answers to the LLM for
    review. Returns a parsed dict when the model responds with JSON, otherwise
    falls back to the raw text under the `raw` key.
    """
    user_prompt = build_review_prompt(questions, answers)
    raw = chat(
        SYSTEM_PROMPTS["QUIZ_REVIEW"],
        user_prompt,
        model=model,
        provider_id=provider_id,
        temperature=0.2,
    )

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {"raw": raw}
