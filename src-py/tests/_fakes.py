"""Duck-typed test doubles shared by the src-py test modules.

Nothing here imports src-py application code, so it stays safe to import from
conftest before the ``--data-dir`` bootstrap completes.
"""

import numpy as np
import pandas as pd


class FakeProvider:
    """Stand-in for an ``LLMProvider``: records calls, replays scripted replies.

    Implements the same surface ``llm.main`` / ``llm.providers`` rely on
    (``available``, ``start``, ``is_available``, ``list_models``, ``has_model``,
    ``chat``) so it can be dropped into ``PROVIDER_REGISTRY`` without touching a
    real backend.
    """

    def __init__(self, replies=None, available=True, models=("fake-model",), provider_id="fake"):
        self.id = provider_id
        self.replies = list(replies or [])
        self.available = available
        self.models = set(models)
        self.display_name = "Fake"
        self.setup_hint = ""
        self.calls = []

    # -- LLMProvider-compatible surface ------------------------------------
    def start(self):
        """No-op: tests must never launch a real LLM server."""
        return None

    def is_available(self):
        return self.available

    def list_models(self):
        return [
            {
                "name": name,
                "size": 0,
                "parameter_size": None,
                "quantization_level": None,
                "family": None,
            }
            for name in sorted(self.models)
        ]

    def has_model(self, model):
        return model in self.models

    def chat(self, system_prompt, user_prompt, model, temperature=0.7, stream=False):
        self.calls.append(
            {
                "system_prompt": system_prompt,
                "user_prompt": user_prompt,
                "model": model,
                "temperature": temperature,
                "stream": stream,
            }
        )
        if not self.replies:
            return "scripted reply"
        reply = self.replies.pop(0)
        if isinstance(reply, Exception):
            raise reply
        return reply


class DummyModel:
    """Mimics the slice of the Stable-Baselines3 ``predict()`` API we depend on."""

    def __init__(self, actions):
        self.actions = np.asarray(actions, dtype=np.float32)
        self.calls = 0

    def predict(self, obs, deterministic=True):
        self.calls += 1
        return self.actions.copy(), None


def make_ohlcv(seed=0, rows=80, start="2025-01-01"):
    """Deterministic synthetic OHLCV frame shaped like a yfinance download."""
    rng = np.random.default_rng(seed)
    close = 100.0 * np.exp(np.cumsum(rng.normal(0.0005, 0.01, rows)))
    open_ = close * (1.0 + rng.normal(0.0, 0.002, rows))
    spread = np.abs(rng.normal(0.0, 0.004, rows))
    index = pd.date_range(start, periods=rows, freq="B")
    return pd.DataFrame(
        {
            "Open": open_,
            "High": np.maximum(open_, close) * (1.0 + spread),
            "Low": np.minimum(open_, close) * (1.0 - spread),
            "Close": close,
            "Volume": rng.integers(1_000_000, 5_000_000, rows).astype(float),
        },
        index=index,
    )
