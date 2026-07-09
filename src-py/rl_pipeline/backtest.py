import math
import numpy as np
import backtrader as bt
import matplotlib.pyplot as plt

from config import LOOKBACK, COMMISSION, MAX_WEIGHT, BUDGET, OUTPUT_DIR, EVAL_START, EVAL_END

class RLStrategy(bt.Strategy):
    params = (
        ("model", None),
        ("feat", None),
        ("closes", None),
        ("tickers", None)
    )

    def __init__(self):
        self._bar = 0
        self._dmap = { d._name: d for d in self.datas }

    def _build_obs(self) -> np.ndarray | None:
        if self._bar < LOOKBACK:
            return None

        windows = []

        for t in self.p.tickers:
            w = self.p.feat[t][self._bar - LOOKBACK: self._bar]
            mn, mx = w.min(0, keepdims=True), w.max(0, keepdims=True)
            windows.append(((w - mn) / (mx - mn + 1e-9)).flatten())

        prices = np.array([self.p.closes[t][self._bar] for t in self.p.tickers], np.float32)
        shares = np.array([self.getposition(self._dmap[t]).size for t in self.p.tickers], np.float32)
        total = self.broker.getvalue()
        wts = (shares * prices) / (total + 1e-9)
        cash_r = np.array([self.broker.getcash() / (total + 1e-9)], np.float32)

        return np.concatenate(windows + [wts, cash_r]).astype(np.float32)

    def next(self):
        obs = self._build_obs()
        if obs is None:
            self._bar += 1
            return

        action, _ = self.p.model.predict(obs, deterministic=True)
        for i, ticker in enumerate(self.p.tickers):
            d = self._dmap.get(ticker)

            if d is None: continue

            a = float(action[i])

            if a > 0.05:
                self.order_target_percent(d, target=min(a, MAX_WEIGHT))

            elif a < -0.05 and self.getposition(d).size > 0:
                cur = self.getposition(d).size
                self.order_target_size(d, target=max(cur * (1 + a), 0))

        self._bar += 1

class BuyAndHold(bt.Strategy):
    def __init__(self): self._done = False

    def next(self):
        if not self._done:
            for d in self.datas:
                self.order_target_percent(d, target=1.0 / len(self.datas))

            self._done = True

def run_backtest_suite(model, eval_data: dict, tickers: list, eval_feat: dict, eval_closes: dict):
    """
    Executes execution tracking and builds final metric comparisons.
    """
    def setup_cerebro():
        c = bt.Cerebro(stdstats=False)
        c.broker.setcash(BUDGET)
        c.broker.setcommission(commission=COMMISSION)

        for ticker, df in eval_data.items():
            ohlcv = df[["Open","High","Low","Close","Volume"]].copy()
            ohlcv.columns = ["open","high","low","close","volume"]
            ohlcv["openinterest"] = 0.0
            c.adddata(bt.feeds.PandasData(dataname=ohlcv, name=ticker))

        c.addanalyzer(bt.analyzers.SharpeRatio, _name="sr", riskfreerate=0.05/252, annualize=True)
        c.addanalyzer(bt.analyzers.DrawDown, _name="dd")
        c.addanalyzer(bt.analyzers.TradeAnalyzer, _name="ta")
        c.addanalyzer(bt.analyzers.TimeReturn, _name="tr")

        return c

    # agent engine execution
    c_rl = setup_cerebro()
    c_rl.addstrategy(RLStrategy, model=model, feat=eval_feat, closes=eval_closes, tickers=tickers)
    rl_strat = c_rl.run()[0]

    # benchmark execution run
    c_bh = setup_cerebro()
    c_bh.addstrategy(BuyAndHold)
    bh_strat = c_bh.run()[0]

    return extract_performance_data(rl_strat, bh_strat, c_rl.broker.getvalue(), c_bh.broker.getvalue())

def extract_performance_data(rl_strat, bh_strat, rl_end, bh_end):
    """
    Processes historical metrics from structural return paths.
    """
    sr = rl_strat.analyzers.sr.get_analysis().get("sharperatio") or 0.0
    dd = rl_strat.analyzers.dd.get_analysis().max.drawdown
    ta = rl_strat.analyzers.ta.get_analysis()
    tr_rl = rl_strat.analyzers.tr.get_analysis()
    tr_bh = bh_strat.analyzers.tr.get_analysis()

    n_trades = int(ta.get("total", {}).get("closed", 0))
    n_won = int(ta.get("won", {}).get("total", 0))
    rl_ret_pct = (rl_end - BUDGET) / BUDGET * 100
    bh_ret_pct = (bh_end - BUDGET) / BUDGET * 100
    vol_ann = np.array(list(tr_rl.values()), dtype=np.float64).std() * math.sqrt(252) * 100

    # save equity curve graph (used in prototyping)
    # save_equity_curve(tr_rl, tr_bh)

    return {
        # RL agent return metrics
        "rl_return_pct": rl_ret_pct,    # (%) total percentage return
        "rl_end_val": rl_end,           # ($) final portfolio dollar value

        # Buy & Hold return metrics
        "bh_return_pct": bh_ret_pct,    # (%) total percentage return
        "bh_end_val": bh_end,           # ($) final portfolio dollar value

        "max_drawdown": dd,             # (%) worst peak-to-trough drop - biggest decline following a climb
        "volatility": vol_ann,          # (%) annualized portfolio volatility (~risk) based on daily standard deviation

        "sharpe": sr,                   #     sharpe ratio (risk-adjusted return metric; higher is better)
        "trades": n_trades,             #     total number of round-trip trades completed and closed by the agent
        "won": n_won,                   #     total number of completed trades that resulted in a positive financial profit
        "tr_rl": tr_rl                  #     dict mapping daily dates to raw returns, used for equity path construction
    }

def save_equity_curve(tr_rl, tr_bh):
    """
    Renders visual baseline tracking comparisons.
    """
    def to_eq(tr_dict):
        v, d_out, v_out = BUDGET, [], []

        for d, r in sorted(tr_dict.items()):
            v *= (1 + r)
            d_out.append(d); v_out.append(v)

        return d_out, v_out

    rl_d, rl_v = to_eq(tr_rl)
    bh_d, bh_v = to_eq(tr_bh)

    fig, ax = plt.subplots(figsize=(12, 5))
    ax.plot(rl_d, rl_v, label="RL Agent", linewidth=1.5)
    ax.plot(bh_d, bh_v, label="Buy-and-Hold", linewidth=1.5, linestyle="--")
    ax.axhline(BUDGET, color="grey", linewidth=0.8, linestyle=":")
    ax.set_title(f"Equity Curve - {EVAL_START} to {EVAL_END}")
    ax.set_ylabel("Portfolio Value ($)")
    ax.legend(); ax.grid(alpha=0.3)

    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "equity_curve.png", dpi=120)
    plt.close()
