import requests
import json
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Dict, List, Any, Tuple

from config import OUTPUT_DIR

OLLAMA_URL = "http://localhost:11434/api/chat"
OLLAMA_BASE = "http://localhost:11434"
MODEL = "0xroyce/plutus"

client = None

def initialize_ollama() -> None:
    global client
    if client is None:
        client = OllamaClient(default_model=MODEL)
        client.start()
        client.ensure_model()


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

    print(f"[Ollama] Starting bundled server from {ollama_path} ...")
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

    print(f"[Ollama] Model '{model}' not found - pulling into {get_models_dir()} ...")
    ollama_path = get_ollama_binary_path()
    env = os.environ.copy()
    env["OLLAMA_MODELS"] = str(get_models_dir())
    subprocess.run([str(ollama_path), "pull", model], check=True, env=env)


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
"""
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

    if not client:
        raise ValueError("Error: ollama client is not initialized")

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
        explanation = client.chat(SYSTEM_PROMPTS["RECOMMENDATIONS"], user_prompt)

        response.append(Explanation(ticker, action, explanation))

    data = recommendations_data.copy()
    data["allocations"] = response

    return Recommendation(**data)

def handle_chat_interaction(user_question: str) -> str:
    """
    Receives questions from a user and processes them using the CHAT rules.
    """
    if not client:
        raise ValueError("Error: ollama client is not initialized")

    response = client.chat(SYSTEM_PROMPTS["CHAT"], user_question)

    return response
