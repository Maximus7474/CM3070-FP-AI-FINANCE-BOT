"""Structural contract for ``recommendations.json``.

Producer: ``rl_pipeline.main.generate_recommendations()``
Consumer: ``llm.main.generate_explanation()``
Reference sample: ``src-py/recommendations.json``

Shape::

    {
      "budget": float,
      "cash_remaining": float,                # budget - sum(allocation dollar_value)
      "eval_period": "YYYY-MM-DD -> YYYY-MM-DD",
      "backtest_summary": {
          "rl_return_pct": float,
          "bh_return_pct": float,
          "sharpe": float,
          "max_drawdown_pct": float,
          "alpha_margin": float,              # producer-only; absent from the old sample
      },
      "allocations": [                        # sorted by dollar_value, descending
          {
              "ticker": str,
              "action": "BUY" | "SELL" | "HOLD",
              "price": float,
              "shares": float,
              "dollar_value": float,
              "pct_of_budget": float,
              "rsi": float,
              "macd_hist": float,
              "bb_pct": float,
          }
      ],
    }
"""

import math
import re

TOP_LEVEL_KEYS = {
    "budget",
    "cash_remaining",
    "eval_period",
    "backtest_summary",
    "allocations",
}
BACKTEST_REQUIRED_KEYS = {
    "rl_return_pct",
    "bh_return_pct",
    "sharpe",
    "max_drawdown_pct",
}
# Written by the current producer but absent from the committed sample.
BACKTEST_OPTIONAL_KEYS = {"alpha_margin"}
ALLOCATION_KEYS = {
    "ticker",
    "action",
    "price",
    "shares",
    "dollar_value",
    "pct_of_budget",
    "rsi",
    "macd_hist",
    "bb_pct",
}
VALID_ACTIONS = {"BUY", "SELL", "HOLD"}

_EVAL_PERIOD_RE = re.compile(r"^\d{4}-\d{2}-\d{2} -> \d{4}-\d{2}-\d{2}$")


def _is_number(value):
    return (
        isinstance(value, (int, float))
        and not isinstance(value, bool)
        and math.isfinite(value)
    )


def assert_valid_recommendations_payload(
    payload, *, require_alpha_margin=False, max_weight_pct=None
):
    """Assert ``payload`` matches the recommendations.json contract.

    ``require_alpha_margin`` is True for payloads produced by the current
    ``generate_recommendations`` (which emits ``alpha_margin``) and False for the
    committed sample, which predates that key.
    ``max_weight_pct`` optionally enforces the per-position weight ceiling
    (``config.MAX_WEIGHT * 100``).
    """
    assert isinstance(payload, dict), "payload must be a JSON object"
    assert set(payload) == TOP_LEVEL_KEYS, (
        "unexpected top-level keys: "
        f"{sorted(set(payload) ^ TOP_LEVEL_KEYS)}"
    )

    assert _is_number(payload["budget"]), "budget must be a finite number"
    assert payload["budget"] > 0, "budget must be positive"
    assert _is_number(payload["cash_remaining"]), (
        "cash_remaining must be a finite number"
    )
    assert 0 <= payload["cash_remaining"] <= payload["budget"], (
        "cash_remaining must be within [0, budget]"
    )

    assert isinstance(payload["eval_period"], str)
    assert _EVAL_PERIOD_RE.match(payload["eval_period"]), (
        f"eval_period must be 'YYYY-MM-DD -> YYYY-MM-DD', got "
        f"{payload['eval_period']!r}"
    )

    summary = payload["backtest_summary"]
    assert isinstance(summary, dict), "backtest_summary must be an object"
    missing = BACKTEST_REQUIRED_KEYS - set(summary)
    assert not missing, f"backtest_summary missing keys: {sorted(missing)}"
    unexpected = set(summary) - BACKTEST_REQUIRED_KEYS - BACKTEST_OPTIONAL_KEYS
    assert not unexpected, f"backtest_summary has unexpected keys: {sorted(unexpected)}"
    if require_alpha_margin:
        assert "alpha_margin" in summary, "producer payload must include alpha_margin"
    for key, value in summary.items():
        assert _is_number(value), f"backtest_summary.{key} must be a finite number"

    allocations = payload["allocations"]
    assert isinstance(allocations, list) and allocations, (
        "allocations must be a non-empty list"
    )

    for allocation in allocations:
        assert isinstance(allocation, dict), "each allocation must be an object"
        assert set(allocation) == ALLOCATION_KEYS, (
            f"allocation keys mismatch for {allocation.get('ticker')!r}: "
            f"{sorted(set(allocation) ^ ALLOCATION_KEYS)}"
        )

        ticker = allocation["ticker"]
        assert isinstance(ticker, str) and ticker.strip(), "ticker must be a non-empty string"
        assert allocation["action"] in VALID_ACTIONS, (
            f"invalid action {allocation['action']!r} for {ticker}"
        )

        for key in (
            "price",
            "shares",
            "dollar_value",
            "pct_of_budget",
            "rsi",
            "macd_hist",
            "bb_pct",
        ):
            assert _is_number(allocation[key]), (
                f"{ticker}.{key} must be a finite number"
            )

        assert allocation["price"] > 0, f"{ticker}.price must be positive"
        assert allocation["shares"] >= 0, f"{ticker}.shares must be non-negative"
        assert allocation["dollar_value"] >= 0, (
            f"{ticker}.dollar_value must be non-negative"
        )
        assert 0.0 <= allocation["rsi"] <= 100.0, f"{ticker}.rsi out of range"

        if allocation["action"] == "BUY":
            assert allocation["shares"] > 0 and allocation["dollar_value"] > 0, (
                f"{ticker}: BUY must allocate money"
            )
            # pct_of_budget is the weight (dollars / budget) expressed as a %.
            expected_pct = allocation["dollar_value"] / payload["budget"] * 100
            assert abs(allocation["pct_of_budget"] - expected_pct) <= 0.11, (
                f"{ticker}.pct_of_budget inconsistent with dollar_value"
            )
        else:
            assert allocation["shares"] == 0.0 and allocation["dollar_value"] == 0.0, (
                f"{ticker}: SELL/HOLD must not allocate money"
            )

        if max_weight_pct is not None:
            assert allocation["pct_of_budget"] <= max_weight_pct + 0.11, (
                f"{ticker}.pct_of_budget exceeds MAX_WEIGHT"
            )

    values = [allocation["dollar_value"] for allocation in allocations]
    assert values == sorted(values, reverse=True), (
        "allocations must be sorted by dollar_value descending"
    )

    committed = sum(values)
    tolerance = 0.02 + 0.01 * len(values)
    assert abs(payload["cash_remaining"] - (payload["budget"] - committed)) <= tolerance, (
        "cash_remaining must equal budget - sum(allocation dollar_value)"
    )

    return payload
