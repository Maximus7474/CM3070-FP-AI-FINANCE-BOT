from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env

from environment import TradingEnv
from config import TIMESTEPS, OUTPUT_DIR, bcolors

def train_ppo_agent(train_data: dict) -> PPO:
    """
    Initializes and trains the Stable-Baselines3 model vectorization framework.
    """
    vec_env = make_vec_env(lambda: TradingEnv(train_data), n_envs=1)
    
    model = PPO(
        "MlpPolicy",
        vec_env,
        learning_rate = 3e-4,
        n_steps       = 256,
        batch_size    = 64,
        n_epochs      = 10,
        gamma         = 0.99,
        ent_coef      = 0.01,
        verbose       = 0,
        policy_kwargs = dict(net_arch=[128, 64]),
    )
    
    print(f"  [{bcolors.OKCYAN}Agent{bcolors.ENDC}] Beginning network policy optimization optimization updates...\n")
    model.learn(total_timesteps=TIMESTEPS, progress_bar=True)
    
    model_path = OUTPUT_DIR / "poc_agent"
    model.save(model_path)
    print()
    print(f"  [{bcolors.OKCYAN}Agent{bcolors.ENDC}] Policy model weights binary serialized out to: {model_path}.zip")

    return model