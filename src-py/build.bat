@echo off
setlocal enabledelayedexpansion

REM Build the Python executable
pyinstaller --onefile --name app main.py
if errorlevel 1 (
    echo PyInstaller build failed.
    exit /b 1
)

REM Detect the Rust target triple for this machine
for /f "tokens=2" %%i in ('rustc -Vv ^| findstr "host:"') do set HOST_TRIPLE=%%i

if "%HOST_TRIPLE%"=="" (
    echo Could not detect Rust host triple. Is rustc installed and on PATH?
    exit /b 1
)

echo Detected target triple: %HOST_TRIPLE%

REM Ensure the destination folder exists
if not exist "..\src-tauri\binaries" mkdir "..\src-tauri\binaries"

REM Copy the built executable with the required sidecar naming convention
copy /Y "dist\app.exe" "..\src-tauri\binaries\app-%HOST_TRIPLE%.exe"
if errorlevel 1 (
    echo Failed to copy built executable.
    exit /b 1
)

echo Done. Sidecar binary placed at ..\src-tauri\binaries\app-%HOST_TRIPLE%.exe
endlocal