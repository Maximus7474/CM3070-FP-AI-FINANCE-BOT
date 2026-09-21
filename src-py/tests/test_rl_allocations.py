"""rl_pipeline.main: allocation thresholds, weight cap and error paths."""

import pytest

import rl_pipeline.main as rl_main
from _fakes import DummyModel
from config import MAX_WEIGHT
from rl_pipeline.main import _calculate_allocations

TICKERS = ["AAA", "BBB", "CCC"]


def test_positive_action_becomes_a_capped_buy(market_data):
    model = DummyModel([0.9, 0.3, 0.0])

    allocations = _calculate_allocations(model, market_data, TICKERS, budget=5000.0)

    by_ticker = {allocation.ticker: allocation for allocation in allocations}
    assert by_ticker["AAA"].action == "BUY"
    # 0.9 is clamped to MAX_WEIGHT
    assert by_ticker["AAA"].dollar_value == pytest.approx(5000.0 * MAX_WEIGHT, abs=0.01)
    assert by_ticker["AAA"].pct_of_budget == pytest.approx(MAX_WEIGHT * 100, abs=0.11)
    assert by_ticker["BBB"].action == "BUY"
    assert by_ticker["BBB"].dollar_value == pytest.approx(1500.0, abs=0.01)


def test_actions_inside_the_dead_zone_fall_back_to_hold(market_data):
    """Signals with |a| <= 0.05 are HOLD (note: float32 rounds 0.05 slightly
    above 0.05, so the dead zone is tested just inside the boundary)."""
    model = DummyModel([0.04, -0.04, 0.0])

    allocations = _calculate_allocations(model, market_data, TICKERS, budget=1000.0)

    assert {allocation.action for allocation in allocations} == {"HOLD"}
    assert all(allocation.dollar_value == 0.0 for allocation in allocations)


def test_negative_action_becomes_a_zero_dollar_sell(market_data):
    model = DummyModel([-0.4, 0.0, 0.0])

    allocations = _calculate_allocations(model, market_data, TICKERS, budget=1000.0)

    by_ticker = {allocation.ticker: allocation for allocation in allocations}
    assert by_ticker["AAA"].action == "SELL"
    assert by_ticker["AAA"].shares == 0.0
    assert by_ticker["AAA"].dollar_value == 0.0


def test_allocations_are_sorted_by_dollar_value_desc(market_data):
    model = DummyModel([0.1, 0.3, 0.0])

    allocations = _calculate_allocations(model, market_data, TICKERS, budget=5000.0)

    values = [allocation.dollar_value for allocation in allocations]
    assert values == sorted(values, reverse=True)
    assert allocations[0].ticker == "BBB"


def test_calculate_allocations_rejects_an_action_vector_of_wrong_length(market_data):
    """A mismatched action vector is an error, not silently truncated."""
    model = DummyModel([0.3])  # only one action for three tickers

    try:
        _calculate_allocations(model, market_data, TICKERS, budget=1000.0)
    except IndexError:
        pass
    else:  # pragma: no cover - documents current behaviour
        raise AssertionError("expected IndexError for a too-short action vector")


def test_train_model_without_market_data_raises_valueerror(monkeypatch, isolated_output_dir):
    monkeypatch.setattr(rl_main, "download_market_data", lambda tickers, start, end: {})

    with pytest.raises(ValueError, match="No market data"):
        rl_main.train_model(
            tickers=["AAPL"],
            train_start="2021-01-01",
            train_end="2021-06-01",
            model_name="unit_model",
        )


def test_train_model_saves_the_trained_model(monkeypatch, ohlcv_factory, isolated_output_dir):
    saved_paths = []

    class _Agent:
        def save(self, path):
            saved_paths.append(path)

    monkeypatch.setattr(
        rl_main,
        "download_market_data",
        lambda tickers, start, end: {"AAPL": ohlcv_factory(seed=11)},
    )
    monkeypatch.setattr(rl_main, "train_ppo_agent", lambda train_data: _Agent())

    model, valid_tickers = rl_main.train_model(
        tickers=["AAPL", "GHOST"],
        train_start="2021-01-01",
        train_end="2021-06-01",
        model_name="unit_model",
    )

    assert valid_tickers == ["AAPL"]  # GHOST had no data and was dropped
    assert isinstance(model, _Agent)
    assert saved_paths == [str(isolated_output_dir / "unit_model")]
