import math
import gymnasium as gym
import numpy as np
import pandas as pd
from gymnasium import spaces

from config import BUDGET, LOOKBACK, N_FEAT, FEATURE_COLS, COMMISSION, MAX_WEIGHT

class TradingEnv(gym.Env):
    """
    Custom standard multi-stock operational environment tracking cash vectors.
    """
    def __init__(self, data: dict[str, pd.DataFrame], budget: float = BUDGET):
        super().__init__()
        self.tickers = list(data.keys())
        self.n = len(self.tickers)
        self.budget = budget

        idx = None
        for df in data.values():
            idx = df.index if idx is None else idx.intersection(df.index)
            
        self.dates = sorted(idx)

        self.feat = {t: data[t].loc[self.dates, FEATURE_COLS].values.astype(np.float32) for t in self.tickers}
        self.closes = {t: data[t].loc[self.dates, "Close"].values.astype(np.float32) for t in self.tickers}

        obs_size = self.n * LOOKBACK * N_FEAT + self.n + 1
        self.observation_space = spaces.Box(-np.inf, np.inf, (obs_size,), np.float32)
        self.action_space = spaces.Box(-1.0, 1.0, (self.n,), np.float32)
        self._reset_state()

    def _reset_state(self):
        self._i = LOOKBACK
        self._shares = np.zeros(self.n, np.float32)
        self._cash = float(self.budget)
        self._prev_v = float(self.budget)

    def _value(self, i: int) -> float:
        prices = np.array([self.closes[t][i] for t in self.tickers])
        
        return float(self._cash + self._shares @ prices)

    def _obs(self) -> np.ndarray:
        windows = []
        for t in self.tickers:
            w = self.feat[t][self._i - LOOKBACK: self._i]
            mn = w.min(0, keepdims=True)
            mx = w.max(0, keepdims=True)
            windows.append(((w - mn) / (mx - mn + 1e-9)).flatten())

        prices = np.array([self.closes[t][self._i] for t in self.tickers])
        v = self._value(self._i)
        weights = (self._shares * prices) / (v + 1e-9)
        cash_r = np.array([self._cash / (v + 1e-9)], np.float32)
        
        return np.concatenate(windows + [weights, cash_r]).astype(np.float32)

    def reset(self, *, seed=None, options=None):
        super().reset(seed=seed)
        self._reset_state()
        
        return self._obs(), {}

    def step(self, action):
        prices = np.array([self.closes[t][self._i] for t in self.tickers])
        total = self._value(self._i)

        for i, a in enumerate(action):
            if a < -0.05 and self._shares[i] > 0:
                sell = self._shares[i] * abs(float(a))
                self._cash += (sell * prices[i]) * (1 - COMMISSION)
                self._shares[i] -= sell

        for i, a in enumerate(action):
            if a > 0.05:
                target = min(float(a), MAX_WEIGHT) * total
                current = self._shares[i] * prices[i]
                spend = min(max(target - current, 0), self._cash * 0.99)
                self._shares[i] += spend / (prices[i] + 1e-9)
                self._cash -= spend * (1 + COMMISSION)

        self._cash = max(self._cash, 0.0)
        self._i += 1
        new_v = self._value(self._i)
        reward = math.log(new_v / (self._prev_v + 1e-9))
        self._prev_v = new_v

        done = self._i >= len(self.dates) - 1

        return self._obs(), reward, done, False, {}