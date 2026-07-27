import json
from pathlib import Path
import numpy as np
from stable_baselines3 import PPO

from rl_pipeline.data import download_market_data
from rl_pipeline.environment import TradingEnv
from rl_pipeline.rl_agent import train_ppo_agent
from rl_pipeline.backtest import run_backtest_suite

from config import TICKERS, BUDGET, TRAIN_START, TRAIN_END, EVAL_START, EVAL_END, FEATURE_COLS, MAX_WEIGHT, OUTPUT_DIR, bcolors

class Allocation:
    ticker: str; action: str; price: float; shares: float
    dollar_value: float; pct_of_budget: float
    rsi: float; macd_hist: float; bb_pct: float

class JsonRecommendation:
    budget: int;
    cash_remaining: int;
    eval_period: str;
    backtest_summary: dict;
    allocations: list[Allocation];

def _calculate_allocations(model, eval_data: dict, tickers: list, budget: float) -> list[Allocation]:
    """
    Internal helper: Generates execution signals for the final evaluation timestamp.
    """
    env = TradingEnv(eval_data, budget=budget)
    env._i = len(env.dates) - 1
    action, _ = model.predict(env._obs(), deterministic=True)

    allocations = []

    for i, ticker in enumerate(tickers):
        a = float(action[i])
        latest = eval_data[ticker].iloc[-1]
        price = float(latest["Close"])

        if a > 0.05:
            weight = min(a, MAX_WEIGHT)
            dollars = budget * weight
            shares = dollars / price
            act = "BUY"

        elif a < -0.05:
            weight = dollars = shares = 0.0; act = "SELL"

        else:
            weight = dollars = shares = 0.0; act = "HOLD"

        allocations.append(Allocation(
            ticker=ticker, action=act, price=round(price, 2), shares=round(shares, 4),
            dollar_value=round(dollars, 2), pct_of_budget=round(weight * 100, 1),
            rsi=round(float(latest["rsi"]), 1), macd_hist=round(float(latest["macd_hist"]), 4),
            bb_pct=round(float(latest["bb_pct"]), 3)
        ))

    allocations.sort(key=lambda x: -x.dollar_value)
    return allocations


def train_model(
    tickers: list = TICKERS,
    train_start: str = TRAIN_START,
    train_end: str = TRAIN_END,
    model_name: str = "ppo_trading_model"
):
    """
    Downloads training data, trains the RL model, and saves it to disk.
    """
    print(f"\n[{bcolors.OKBLUE}Train{bcolors.ENDC}] Downloading market data: {train_start} -> {train_end}")

    train_raw = download_market_data(tickers, train_start, train_end)
    valid_tickers = [t for t in tickers if t in train_raw]
    train_data = {t: train_raw[t] for t in valid_tickers}

    # if valid_tickers:
    #     save_diagnostic_chart(train_data, valid_tickers[0])

    print(f"[{bcolors.OKBLUE}Train{bcolors.ENDC}] Training PPO agent...")
    model = train_ppo_agent(train_data)

    # Store and make accessible all trained models
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    model_path = OUTPUT_DIR / model_name

    # Assuming the model has a standard save method (like Stable Baselines 3)
    if hasattr(model, "save"):
        model.save(str(model_path))
        print(f"[{bcolors.OKGREEN}Train{bcolors.ENDC}] Model saved to -> {model_path}.zip")

    return model, valid_tickers

def generate_recommendations(
    model,
    valid_tickers: list,
    eval_start: str = EVAL_START,
    eval_end: str = EVAL_END,
    budget: float = BUDGET,
    output_filename: str = "recommendations.json"
) -> Path:
    """
    Evaluates the model, generates allocations, formats the payload,
    saves to JSON, and returns the absolute path of the JSON file.
    """
    print(f"\n[{bcolors.OKBLUE}Eval{bcolors.ENDC}] Downloading eval data: {eval_start} -> {eval_end}")

    eval_raw = download_market_data(valid_tickers, eval_start, eval_end)
    eval_data = {t: eval_raw[t] for t in valid_tickers if t in eval_raw}

    # Run Backtest
    env_eval = TradingEnv(eval_data, budget=budget)
    eval_feat = {t: eval_data[t].loc[env_eval.dates, FEATURE_COLS].values.astype(np.float32) for t in valid_tickers}
    eval_closes = {t: eval_data[t].loc[env_eval.dates, "Close"].values.astype(np.float32) for t in valid_tickers}

    metrics = run_backtest_suite(model, eval_data, valid_tickers, eval_feat, eval_closes)

    # Generate Allocations
    allocations = _calculate_allocations(model, eval_data, valid_tickers, budget)
    total_out = sum(a.dollar_value for a in allocations)

    # Print Performance Metrics
    print("\n" + ("=" * 60))
    print("  Performance Results")
    print(("=" * 60) + "\n")
    print(f"  RL Model Return    : {metrics['rl_return_pct']:>+7.2f} %  (${metrics['rl_end_val']:>9,.2f})")
    print(f"  Benchmark B&H      : {metrics['bh_return_pct']:>+7.2f} %  (${metrics['bh_end_val']:>9,.2f})")
    print(f"  Alpha Margin       : {metrics['rl_return_pct'] - metrics['bh_return_pct']:>+7.2f} %")
    print(f"  Sharpe Ratio       : {metrics['sharpe']:>7.3f}")

    # LLM Payload
    payload = {
        "budget": budget,
        "cash_remaining": round(budget - total_out, 2),
        "eval_period": f"{eval_start} -> {eval_end}",
        "backtest_summary": {
            "rl_return_pct": round(metrics['rl_return_pct'], 2),
            "bh_return_pct": round(metrics['bh_return_pct'], 2),
            "sharpe": round(metrics['sharpe'], 3),
            "max_drawdown_pct": round(metrics['max_drawdown'], 2),
        },
        "allocations": [a.__dict__ for a in allocations]
    }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    payload_path = OUTPUT_DIR / output_filename

    with open(payload_path, "w") as f:
        json.dump(payload, f, indent=2)

    print(f"\n  [{bcolors.OKGREEN}Main{bcolors.ENDC}] LLM Engine Context payload metadata dumped -> {payload_path}\n")

    return payload_path.resolve()

def load_trained_model(model_name: str = "ppo_trading_model"):
    """
    Helper to load a previously trained model from the OUTPUT_DIR.
    """
    model_path = OUTPUT_DIR / model_name
    # Uncomment and use your specific library's load function
    return PPO.load(str(model_path))

def main():
    """
    Example usage of the new refactored pipeline.
    """
    print("\n" + ("=" * 60))
    print("  RL Stock Investment Agent Pipeline")
    print(("=" * 60) + "\n")

    trained_model, valid_tickers = train_model(
        tickers=TICKERS,
        train_start=TRAIN_START,
        train_end=TRAIN_END,
        model_name="ppo_trading_model"
    )

    json_path = generate_recommendations(
        model=trained_model,
        valid_tickers=valid_tickers,
        eval_start=EVAL_START,
        eval_end=EVAL_END,
        budget=BUDGET,
        output_filename="recommendations.json"
    )

    print(f"Pipeline complete. Application can now read from: {json_path}")

if __name__ == "__main__":
    main()
