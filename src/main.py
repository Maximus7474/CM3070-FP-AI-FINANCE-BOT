import json
from dataclasses import dataclass
import numpy as np

from config import TICKERS, BUDGET, TRAIN_START, TRAIN_END, EVAL_START, EVAL_END, FEATURE_COLS, MAX_WEIGHT, OUTPUT_DIR, bcolors
from data import download_market_data, save_diagnostic_chart
from environment import TradingEnv
from rl_agent import train_ppo_agent
from backtest import run_backtest_suite

@dataclass
class Allocation:
    ticker: str; action: str; price: float; shares: float
    dollar_value: float; pct_of_budget: float
    rsi: float; macd_hist: float; bb_pct: float

def generate_recommendations(model, eval_data: dict, tickers: list) -> list[Allocation]:
    """
    Generates execution signals for the final evaluation timestamp.
    """
    env = TradingEnv(eval_data, budget=BUDGET)
    env._i = len(env.dates) - 1
    action, _ = model.predict(env._obs(), deterministic=True)

    allocations = []
    
    for i, ticker in enumerate(tickers):
        a = float(action[i])
        latest = eval_data[ticker].iloc[-1]
        price = float(latest["Close"])

        if a > 0.05:
            weight = min(a, MAX_WEIGHT)
            dollars = BUDGET * weight
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

def main():
    print("\n" + ("=" * 60))
    print("  RL Stock Investment Agent")
    print(("=" * 60) + "\n")
    
    print(f"  Tickers : {TICKERS}")
    print(f"  Budget  : ${BUDGET:,.0f}")
    print(f"  Train   : {TRAIN_START} → {TRAIN_END}")
    print(f"  Eval    : {EVAL_START}  → {EVAL_END}\n")

    # extract & form data
    train_raw = download_market_data(TICKERS, TRAIN_START, TRAIN_END)
    eval_raw = download_market_data(TICKERS, EVAL_START, EVAL_END)
    tickers = [t for t in TICKERS if t in train_raw and t in eval_raw]
    
    train_data = {t: train_raw[t] for t in tickers}
    eval_data = {t: eval_raw[t] for t in tickers}
    save_diagnostic_chart(train_data, tickers[0])

    # policy optimization
    model = train_ppo_agent(train_data)

    # backtesting
    env_eval = TradingEnv(eval_data)
    eval_feat = {t: eval_data[t].loc[env_eval.dates, FEATURE_COLS].values.astype(np.float32) for t in tickers}
    eval_closes = {t: eval_data[t].loc[env_eval.dates, "Close"].values.astype(np.float32) for t in tickers}

    metrics = run_backtest_suite(model, eval_data, tickers, eval_feat, eval_closes)

    # generate recommentations
    allocations = generate_recommendations(model, eval_data, tickers)
    total_out = sum(a.dollar_value for a in allocations)

    print("\n" + ("=" * 60))
    print("  Performance Results")
    print(("=" * 60) + "\n")
    print(f"  RL Model Return    : {metrics['rl_return_pct']:>+7.2f} %  (${metrics['rl_end_val']:>9,.2f})")
    print(f"  Benchmark B&H      : {metrics['bh_return_pct']:>+7.2f} %  (${metrics['bh_end_val']:>9,.2f})")
    print(f"  Alpha Margin       : {metrics['rl_return_pct'] - metrics['bh_return_pct']:>+7.2f} %")
    print(f"  Sharpe Ratio       : {metrics['sharpe']:>7.3f}")

    # LLM Payload
    payload = {
        "budget": BUDGET, "cash_remaining": round(BUDGET - total_out, 2),
        "eval_period": f"{EVAL_START} -> {EVAL_END}",
        "backtest_summary": {
            "rl_return_pct": round(metrics['rl_return_pct'], 2),
            "bh_return_pct": round(metrics['bh_return_pct'], 2),
            "sharpe": round(metrics['sharpe'], 3),
            "max_drawdown_pct": round(metrics['max_drawdown'], 2),
        },
        "allocations": [a.__dict__ for a in allocations]
    }
    
    payload_path = OUTPUT_DIR / "recommendation.json"
    
    with open(payload_path, "w") as f:
        json.dump(payload, f, indent=2)
        
    print(f"\n  [{bcolors.OKGREEN}Main{bcolors.ENDC}] LLM Engine Context payload metadata dumped -> {payload_path}\n")

if __name__ == "__main__":
    main()