@echo off
setlocal enabledelayedexpansion

REM Always operate relative to this script's own location (src-py/)
pushd "%~dp0"

REM Create the venv if it doesn't exist yet
if not exist ".venv\Scripts\activate.bat" (
    echo Creating virtual environment...
    python -m venv .venv
    if errorlevel 1 (
        echo Failed to create virtual environment.
        popd
        exit /b 1
    )
)

REM Activate the venv
call .venv\Scripts\activate.bat
if errorlevel 1 (
    echo Failed to activate virtual environment.
    popd
    exit /b 1
)

REM Install/update dependencies
if exist "requirements.txt" (
    pip install -r requirements.txt
    if errorlevel 1 (
        echo Failed to install dependencies.
        call .venv\Scripts\deactivate.bat
        popd
        exit /b 1
    )
) else (
    echo WARNING: requirements.txt not found, skipping dependency install.
)

REM Make sure pyinstaller itself is available
pip show pyinstaller >nul 2>&1
if errorlevel 1 (
    echo Installing PyInstaller...
    pip install pyinstaller
)

REM Build the Python executable
pyinstaller --onefile --name app main.py --clean
if errorlevel 1 (
    echo PyInstaller build failed.
    call .venv\Scripts\deactivate.bat
    popd
    exit /b 1
)

REM Detect the Rust target triple for this machine
for /f "tokens=2" %%i in ('rustc -Vv ^| findstr "host:"') do set HOST_TRIPLE=%%i

if "%HOST_TRIPLE%"=="" (
    echo Could not detect Rust host triple. Is rustc installed and on PATH?
    call .venv\Scripts\deactivate.bat
    popd
    exit /b 1
)

echo Detected target triple: %HOST_TRIPLE%

REM Ensure the destination folder exists
if not exist "..\src-tauri\binaries" mkdir "..\src-tauri\binaries"

REM Copy the built executable with the required sidecar naming convention
copy /Y "dist\app.exe" "..\src-tauri\binaries\app-%HOST_TRIPLE%.exe"
if errorlevel 1 (
    echo Failed to copy built executable.
    call .venv\Scripts\deactivate.bat
    popd
    exit /b 1
)

timeout /t 3 /nobreak >nul

echo Done. Sidecar binary placed at ..\src-tauri\binaries\app-%HOST_TRIPLE%.exe

call venv\Scripts\deactivate.bat
popd
endlocal