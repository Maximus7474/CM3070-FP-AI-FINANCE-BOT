# PPO Training Log

Will only be logged to the console when verbosity is enabled:

```python
model = PPO(
  "MlpPolicy",
  vec_env,
  # ...kwargs
  verbose       = 1,    # <- this value should be 1, 0 will disable logging
)
```

Output:
```text
-----------------------------------------
| rollout/                |             |
|    ep_len_mean          | 713         |
|    ep_rew_mean          | 0.74        |
| time/                   |             |
|    fps                  | 608         |
|    iterations           | 118         |
|    time_elapsed         | 49          |
|    total_timesteps      | 30208       |
| train/                  |             |
|    approx_kl            | 0.023351558 |
|    clip_fraction        | 0.242       |
|    clip_range           | 0.2         |
|    entropy_loss         | -4.05       |
|    explained_variance   | 0.918       |
|    learning_rate        | 0.0003      |
|    loss                 | -0.123      |
|    n_updates            | 1170        |
|    policy_gradient_loss | -0.053      |
|    std                  | 0.934       |
|    value_loss           | 0.000203    |
-----------------------------------------
```

## Metric meanings

### `rollout/` — episode‑level performance

- **`ep_len_mean` = 713**  
  Average number of timesteps per episode (bars/steps per reset cycle).

- **`ep_rew_mean` = 0.74**  
  Average episodic reward (sum of per‑step rewards in an episode).  
  In this env, reward is log‑return, so this roughly reflects average log‑growth per episode.

### `time/` — training speed and progress

- **`fps` = 608**  
  Environment steps processed per second (training speed).

- **`iterations` = 118**  
  Number of PPO iterations completed (data collection + update cycles).

- **`time_elapsed` = 49**  
  Wall‑clock seconds since training started.

- **`total_timesteps` = 30208**  
  Total environment steps seen so far.

### `train/` — PPO internal learning metrics

- **`approx_kl` = 0.023351558**  
  Approximate KL (Kullback–Leibler) divergence between old and new policy (policy change size).
  Used to compare policies between iterations, ideal range is 0.01-0.03

- **`clip_fraction` = 0.242**  
  Fraction of probability‑ratio terms that were clipped in the PPO objective.

- **`clip_range` = 0.2**  
  PPO clipping parameter \(\epsilon\) (fixed value).

- **`entropy_loss` = -4.05**  
  Entropy bonus term in the loss (negative because it’s subtracted); encourages exploration.

- **`explained_variance` = 0.918**  
  How well the value network predicts returns (close to 1 = good fit).

- **`learning_rate` = 0.0003**  
  Current optimizer learning rate.

- **`loss` = -0.123**  
  Total PPO loss (policy + value + entropy components).

- **`n_updates` = 1170**  
  Total number of update steps performed.
  (Links to `n_steps` in the PPO constructor)

- **`policy_gradient_loss` = -0.053**  
  Policy (actor) loss component (clipped surrogate objective).

- **`std` = 0.934**  
  Average standard deviation of the policy’s action distribution (action stochasticity).

- **`value_loss` = 0.000203**  
  Value loss, part of the loss function which is used to train the value netwrok.
  It helps predict how good each state is, being calculated by the difference between a predicted value
  and the target return/value.
