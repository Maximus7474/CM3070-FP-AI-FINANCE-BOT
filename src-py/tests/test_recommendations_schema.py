"""recommendations.json must keep the exact structure its producer and consumer agree on."""

import json

import pytest

import config
import rl_pipeline.main as rl_main
from _fakes import DummyModel
from _schema import (
    ALLOCATION_KEYS,
    BACKTEST_OPTIONAL_KEYS,
    BACKTEST_REQUIRED_KEYS,
    TOP_LEVEL_KEYS,
    assert_valid_recommendations_payload,
)

TICKERS = ["AAA", "BBB", "CCC"]


# ---------------------------------------------------------------------------
# Committed sample file (the shape the frontend already consumes)
# ---------------------------------------------------------------------------

def test_committed_sample_matches_the_schema(recommendations_sample):
    assert_valid_recommendations_payload(recommendations_sample)


def test_committed_sample_has_exactly_the_expected_keys(recommendations_sample):
    assert set(recommendations_sample) == TOP_LEVEL_KEYS
    assert set(recommendations_sample["backtest_summary"]) == BACKTEST_REQUIRED_KEYS
    for allocation in recommendations_sample["allocations"]:
        assert set(allocation) == ALLOCATION_KEYS


def test_committed_sample_tickers_are_unique(recommendations_sample):
    tickers = [allocation["ticker"] for allocation in recommendations_sample["allocations"]]

    assert len(tickers) == len(set(tickers))
    assert all(isinstance(ticker, str) and ticker for ticker in tickers)


def test_committed_sample_predates_alpha_margin(recommendations_sample):
    """Documents the drift: the current producer adds alpha_margin, the sample does not."""
    assert "alpha_margin" not in recommendations_sample["backtest_summary"]
    assert "alpha_margin" in BACKTEST_OPTIONAL_KEYS


# ---------------------------------------------------------------------------
# Producer output (generate_recommendations)
# ---------------------------------------------------------------------------

def _stub_metrics():
    return {
        "rl_return_pct": 12.5,
        "bh_return_pct": 9.0,
        "sharpe": 1.1,
        "max_drawdown": 7.5,
    }


def test_generate_recommendations_writes_a_schema_valid_file(
    monkeypatch, market_data, isolated_output_dir
):
    monkeypatch.setattr(rl_main, "download_market_data", lambda tickers, start, end: market_data)
    monkeypatch.setattr(rl_main, "run_backtest_suite", lambda *args, **kwargs: _stub_metrics())
    model = DummyModel([0.5, -0.5, 0.0])

    path, payload = rl_main.generate_recommendations(
        model=model,
        valid_tickers=TICKERS,
        eval_start="2025-01-01",
        eval_end="2025-06-01",
        budget=5000.0,
        output_filename="recommendations.json",
    )

    # file path contract: OUTPUT_DIR / output_filename, returned resolved
    assert path == (isolated_output_dir / "recommendations.json").resolve()
    assert path.is_file()
    assert json.loads(path.read_text(encoding="utf-8")) == payload

    # structure contract
    assert_valid_recommendations_payload(
        payload,
        require_alpha_margin=True,
        max_weight_pct=config.MAX_WEIGHT * 100,
    )
    assert set(payload) == TOP_LEVEL_KEYS
    assert set(payload["backtest_summary"]) == BACKTEST_REQUIRED_KEYS | BACKTEST_OPTIONAL_KEYS


def test_generate_recommendations_payload_values(
    monkeypatch, market_data, isolated_output_dir
):
    monkeypatch.setattr(rl_main, "download_market_data", lambda tickers, start, end: market_data)
    monkeypatch.setattr(rl_main, "run_backtest_suite", lambda *args, **kwargs: _stub_metrics())
    model = DummyModel([0.5, -0.5, 0.0])

    _, payload = rl_main.generate_recommendations(
        model=model,
        valid_tickers=TICKERS,
        eval_start="2025-01-01",
        eval_end="2025-06-01",
        budget=5000.0,
    )

    assert payload["budget"] == 5000.0
    assert payload["eval_period"] == "2025-01-01 -> 2025-06-01"
    assert payload["backtest_summary"]["rl_return_pct"] == pytest.approx(12.5)
    assert payload["backtest_summary"]["alpha_margin"] == pytest.approx(3.5)

    by_ticker = {allocation["ticker"]: allocation for allocation in payload["allocations"]}
    assert by_ticker["AAA"]["action"] == "BUY"
    assert by_ticker["AAA"]["dollar_value"] == pytest.approx(5000.0 * config.MAX_WEIGHT, abs=0.01)
    assert by_ticker["BBB"]["action"] == "SELL"
    assert by_ticker["CCC"]["action"] == "HOLD"
    # cash left over after the BUY
    assert payload["cash_remaining"] == pytest.approx(5000.0 - by_ticker["AAA"]["dollar_value"], abs=0.02)


# ---------------------------------------------------------------------------
# Consumer view of the same file
# ---------------------------------------------------------------------------

def test_consumer_reads_the_committed_sample(
    fake_provider, isolated_output_dir, recommendations_sample
):
    """generate_explanation must accept the shipped file and explain each row."""
    (isolated_output_dir / "recommendations.json").write_text(
        json.dumps(recommendations_sample), encoding="utf-8"
    )
    fake_provider.replies = ["first", "second", "third"]

    from llm.main import generate_explanation

    recommendation = generate_explanation("recommendations.json")

    assert [allocation.ticker for allocation in recommendation.allocations] == [
        allocation["ticker"] for allocation in recommendations_sample["allocations"]
    ]
    assert [allocation.action for allocation in recommendation.allocations] == [
        allocation["action"] for allocation in recommendations_sample["allocations"]
    ]
    assert recommendation.budget == recommendations_sample["budget"]
    assert recommendation.to_dict()["allocations"][0].keys() == {
        "ticker",
        "action",
        "justification",
    }
