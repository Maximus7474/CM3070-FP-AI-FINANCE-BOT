# Ai Financial Bot

A system built in providing recommendations for financial investments in stocks and markets powered by artificial intelligence systems.

> [!WARNING]
> This is only a tool, not actual financial advice tool as it can make mistakes.
> Use at your own risk and always confirm with accurate sources the provided advice.

## LLM explainability

- Handling an ollama LLM model locally

Used model:
- Used model: [0xroyce/plutus](https://ollama.com/0xroyce/plutus)
- License: [LLAMA 3.1](https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct/blob/main/LICENSE)

## Shipping a build

This is a [Tauri 2](https://tauri.app) desktop app with a Python sidecar (built with PyInstaller). Everything — the frontend, the Rust app, and the Python engine — gets bundled into a single self-contained installer.

### Building

From the project root, run:

```sh
bun run tauri build
```

This runs the full pipeline: PyInstaller builds the Python sidecar into `src-tauri/binaries/`, Vite builds the frontend into `dist/`, and Tauri compiles the Rust binary and produces installers in:

```
src-tauri/target/release/bundle/nsis/financial-advisor-app_0.1.0_x64-setup.exe
src-tauri/target/release/bundle/msi/financial-advisor-app_0.1.0_x64_en-US.msi
```

### What to ship

**Zip only the NSIS installer** (`.../nsis/financial-advisor-app_0.1.0_x64-setup.exe`). It is fully self-contained — do **not** zip `dist/`, `src-tauri/binaries/`, or `node_modules/`; those are build inputs that are already baked into the installer. A third party downloads that single file, double-clicks it, and installs the whole app.

The app depends on [Ollama](https://ollama.com) and the `0xroyce/plutus` model at runtime, which the user installs separately — see [INSTALL.md](INSTALL.md) for the end-user installation guide to ship alongside the installer.

### Build machine prerequisites

- [Rust](https://www.rust-lang.org/) (MSVC toolchain)
- [Bun](https://bun.sh/) (or Node.js — adjust the `bun` commands in `package.json` accordingly)
- Python 3 (`src-py/build.bat` creates the venv and installs PyInstaller + dependencies automatically)
- Windows (the sidecar binary is currently built for `x86_64-pc-windows-msvc` only)

Note: the produced installer is large (several hundred MB) because the Python sidecar bundles PyTorch and the reinforcement-learning stack, and the first app launch is slower than usual while it extracts.

## Running the tests

The Python engine (`src-py/`) ships with a pytest suite covering the connection points between its modules: storage/path handling, market-data interpretation and its fallbacks, the allocations -> `recommendations.json` structure, per-feature system-prompt attribution, and the FastAPI endpoints.

Install the test dependency, the runtime stack from `requirements.txt` is reused, so run this in the same environment the sidecar uses (on `src-py/build.bat`-created venvs, activate it first):

```sh
pip install -r src-py/requirements-dev.txt
```

Run the suite from the project root:

```sh
python -m pytest src-py/tests
```

or from inside the engine directory (where `pytest.ini` also applies):

```sh
cd src-py
python -m pytest
```

To run a single module, pass its path, e.g. `python -m pytest src-py/tests/test_recommendations_schema.py`.

The suite is fully offline: yfinance, Ollama and Wikipedia are replaced by test doubles, so no network access or running LLM backend is required, and the run finishes in a few seconds.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
