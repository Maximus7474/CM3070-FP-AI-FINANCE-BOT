"""rl_pipeline.data + rl_pipeline.environment: valid inputs, fallbacks, errors."""

import numpy as np
import pandas as pd
import pytest

import config
import rl_pipeline.data as data_mod
from config import LOOKBACK, MAX_WEIGHT
from rl_pipeline.environment import TradingEnv


# ---------------------------------------------------------------------------
# add_indicators
# ---------------------------------------------------------------------------

def test_add_indicators_appends_feature_columns(ohlcv_factory):
    """Valid OHLCV input gains exactly the feature columns the env needs."""
    out = data_mod.add_indicators(ohlcv_factory(seed=1))

    for column in ("rsi", "macd_hist", "bb_pct", "atr"):
        assert column in out.columns
    assert not out[["rsi", "macd_hist", "bb_pct", "atr"]].isna().any().any()


def test_add_indicators_drops_warmup_rows(ohlcv_factory):
    """Indicator warm-up NaNs are dropped, leaving a usable frame."""
    raw = ohlcv_factory(seed=2)
    out = data_mod.add_indicators(raw.copy())

    assert len(out) < len(raw)
    assert out.index.is_monotonic_increasing


def test_add_indicators_rsi_stays_within_bounds(ohlcv_factory):
    out = data_mod.add_indicators(ohlcv_factory(seed=3))

    assert out["rsi"].between(0.0, 100.0).all()


def test_add_indicators_rejects_frame_without_ohlcv_columns():
    """Invalid input (missing OHLCV columns) raises instead of returning junk."""
    with pytest.raises(KeyError):
        data_mod.add_indicators(pd.DataFrame({"Close": [1.0, 2.0, 3.0]}))


# ---------------------------------------------------------------------------
# download_market_data (yfinance replaced by a fake)
# ---------------------------------------------------------------------------

class _FakeYFDownload:
    def __init__(self, frames):
        self.frames = frames
        self.calls = []

    def __call__(self, ticker, start=None, end=None, progress=False, auto_adjust=True):
        self.calls.append((ticker, start, end))
        return self.frames[ticker].copy()


def test_download_market_data_augments_fresh_frames(monkeypatch, ohlcv_factory):
    fake = _FakeYFDownload({"AAA": ohlcv_factory(seed=4)})
    monkeypatch.setattr(data_mod.yf, "download", fake)

    out = data_mod.download_market_data(["AAA"], "2025-01-01", "2025-06-01")

    assert list(out) == ["AAA"]
    assert "rsi" in out["AAA"].columns
    assert fake.calls == [("AAA", "2025-01-01", "2025-06-01")]


def test_download_market_data_skips_thin_history(monkeypatch, ohlcv_factory):
    """A ticker with too little history is skipped, not a hard failure."""
    fake = _FakeYFDownload(
        {
            "THIN": ohlcv_factory(seed=5, rows=10),  # < LOOKBACK + 30
            "GOOD": ohlcv_factory(seed=6),
        }
    )
    monkeypatch.setattr(data_mod.yf, "download", fake)

    out = data_mod.download_market_data(["THIN", "GOOD"], "2025-01-01", "2025-06-01")

    assert list(out) == ["GOOD"]


def test_download_market_data_skips_empty_frames(monkeypatch, ohlcv_factory):
    """An empty download (bad ticker) falls back to omission."""
    fake = _FakeYFDownload(
        {
            "EMPTY": ohlcv_factory(seed=7).iloc[0:0],
            "GOOD": ohlcv_factory(seed=8),
        }
    )
    monkeypatch.setattr(data_mod.yf, "download", fake)

    out = data_mod.download_market_data(["EMPTY", "GOOD"], "2025-01-01", "2025-06-01")

    assert list(out) == ["GOOD"]


def test_download_market_data_flattens_multiindex_columns(monkeypatch, ohlcv_factory):
    """yfinance's MultiIndex columns are flattened before indicators are added."""
    frame = ohlcv_factory(seed=9)
    frame.columns = pd.MultiIndex.from_tuples(
        [(column, "AAA") for column in frame.columns]
    )
    fake = _FakeYFDownload({"AAA": frame})
    monkeypatch.setattr(data_mod.yf, "download", fake)

    out = data_mod.download_market_data(["AAA"], "2025-01-01", "2025-06-01")

    assert not isinstance(out["AAA"].columns, pd.MultiIndex)
    assert "rsi" in out["AAA"].columns


# ---------------------------------------------------------------------------
# TradingEnv
# ---------------------------------------------------------------------------

def test_observation_size_follows_the_documented_formula(market_data):
    env = TradingEnv(market_data)
    n_tickers = len(env.tickers)

    assert env.observation_space.shape == (n_tickers * LOOKBACK * config.N_FEAT + n_tickers + 1,)
    assert env.action_space.shape == (n_tickers,)


def test_reset_starts_flat_and_in_cash(market_data):
    env = TradingEnv(market_data, budget=1000.0)

    obs, info = env.reset()

    assert obs.shape == env.observation_space.shape
    assert env._cash == 1000.0
    assert np.all(env._shares == 0)
    assert info == {}


def test_buy_action_is_capped_by_max_weight(market_data):
    """A full-strength signal still respects MAX_WEIGHT and pays commission."""
    env = TradingEnv(market_data, budget=5000.0)
    env.reset()
    price = float(env.closes["AAA"][env._i])

    env.step(np.array([1.0, 0.0, 0.0], dtype=np.float32))

    assert env._shares[0] == pytest.approx(5000.0 * MAX_WEIGHT / price, rel=1e-4)
    assert env._cash < 5000.0  # commission was charged


def test_zero_action_leaves_the_portfolio_untouched(market_data):
    env = TradingEnv(market_data, budget=5000.0)
    env.reset()

    _, reward, done, truncated, info = env.step(np.zeros(3, dtype=np.float32))

    assert np.all(env._shares == 0)
    assert env._cash == 5000.0
    assert reward == pytest.approx(0.0)
    assert done is False
    assert truncated is False


def test_sell_action_closes_the_position(market_data):
    env = TradingEnv(market_data, budget=5000.0)
    env.reset()

    env.step(np.array([1.0, 0.0, 0.0], dtype=np.float32))
    assert env._shares[0] > 0

    env.step(np.array([-1.0, 0.0, 0.0], dtype=np.float32))

    assert env._shares[0] == pytest.approx(0.0, abs=1e-6)


def test_episode_terminates_after_the_last_date(market_data):
    env = TradingEnv(market_data, budget=1000.0)
    env.reset()
    action = np.zeros(3, dtype=np.float32)

    steps = 0
    done = False
    while not done:
        _, _, done, _, _ = env.step(action)
        steps += 1
        assert steps < 500  # safety net against an endless episode

    assert env._i >= len(env.dates) - 1
