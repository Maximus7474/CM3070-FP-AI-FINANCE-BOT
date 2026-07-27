import pandas as pd
import yfinance as yf
import matplotlib
import matplotlib.pyplot as plt

from config import LOOKBACK, OUTPUT_DIR, bcolors

matplotlib.use("Agg")

def add_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """
    Appends RSI, MACD, Bollinger Bands, and ATR technical features to the dataset.
    """
    c, h, l, v = df["Close"], df["High"], df["Low"], df["Volume"]

    # RSI-14
    delta = c.diff()
    df["rsi"] = 100 - 100 / (
        1 + delta.clip(lower=0).rolling(14).mean()
        / (-delta.clip(upper=0)).rolling(14).mean().replace(0, 1e-9)
    )

    # MACD histogram
    ema12 = c.ewm(span=12, adjust=False).mean()
    ema26 = c.ewm(span=26, adjust=False).mean()
    macd = ema12 - ema26
    df["macd_hist"] = macd - macd.ewm(span=9, adjust=False).mean()

    # Bollinger Band position (20-day, 2σ)
    sma = c.rolling(20).mean()
    std = c.rolling(20).std()
    df["bb_pct"] = (c - (sma - 2*std)) / (4*std + 1e-9)

    # ATR-14
    tr = pd.concat([h-l, (h-c.shift()).abs(), (l-c.shift()).abs()], axis=1).max(axis=1)
    df["atr"] = tr.rolling(14).mean()

    return df.dropna()

def download_market_data(tickers: list[str], start: str, end: str) -> dict[str, pd.DataFrame]:
    """
    Downloads time-series data and appends indicator columns.
    """
    datasets: dict[str, pd.DataFrame] = {}
    
    print(f"  [{bcolors.OKCYAN}Data{bcolors.ENDC}] Downloading market data ({start} -> {end})")
    
    for ticker in tickers:
        raw = yf.download(ticker, start=start, end=end, progress=False, auto_adjust=True)
        if isinstance(raw.columns, pd.MultiIndex):
            raw.columns = raw.columns.get_level_values(0)

        if len(raw) < LOOKBACK + 30:
            continue

        df = add_indicators(raw.copy())
        datasets[ticker] = df
        
        print(f"    - {ticker}: {len(df)} rows, "
              f"price range ${df['Close'].min():.0f}–${df['Close'].max():.0f}")
        
    return datasets

def save_diagnostic_chart(train_data: dict[str, pd.DataFrame], target_ticker: str):
    """
    Saves close price and RSI analytics for observation verification.
    """
    if target_ticker not in train_data:
        return
    
    df_vis = train_data[target_ticker]
    fig, axes = plt.subplots(2, 1, figsize=(12, 6), sharex=True)
    
    axes[0].plot(df_vis.index, df_vis["Close"], linewidth=1)
    axes[0].set_title(f"{target_ticker} - Closing Price (training period)")
    axes[0].set_ylabel("Price ($)")

    axes[1].plot(df_vis.index, df_vis["rsi"], color="orange", linewidth=1)
    axes[1].axhline(70, color="red", linestyle="--", linewidth=0.8, label="Overbought 70")
    axes[1].axhline(30, color="green", linestyle="--", linewidth=0.8, label="Oversold 30")
    axes[1].set_title("RSI-14")
    axes[1].set_ylabel("RSI")
    axes[1].legend()

    plt.tight_layout()
    chart_path = OUTPUT_DIR / "price_rsi.png"
    plt.savefig(chart_path, dpi=120)
    plt.close()
    print(f"  [{bcolors.OKCYAN}Data{bcolors.ENDC}] Diagnostic chart saved → {chart_path}")