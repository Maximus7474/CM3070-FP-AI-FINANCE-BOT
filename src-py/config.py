import warnings

from utils.path import StorageManager

warnings.filterwarnings("ignore")

# assets & capital
TICKERS = ["AAPL", "MSFT", "NVDA"]
BUDGET = 5_000.0
# maximum share of portfolio capital per stock (40%)
MAX_WEIGHT = 0.40
# 0.1% per trade transaction execution
COMMISSION = 0.001

# time frames
TRAIN_START = "2021-01-01"
TRAIN_END = "2023-12-31"
EVAL_START = "2025-01-01"
EVAL_END = "2026-06-01"

# parameters
LOOKBACK = 20
TIMESTEPS = 30_000
FEATURE_COLS = ["Close", "rsi", "macd_hist", "bb_pct", "atr"]
N_FEAT = len(FEATURE_COLS)

# putput paths
OUTPUT_DIR = StorageManager.get_path("output")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Source - https://stackoverflow.com/a/287944
# Posted by joeld, modified by community. See post "Timeline" for change history
# Retrieved 2026-06-23, License - CC BY-SA 4.0

class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"
