@echo off
REM AARK ERP Supabase - Setup Script for Windows
REM This script automates the setup process

color 0A
echo.
echo    ***********************
echo    AARK ERP Supabase Setup
echo    ***********************
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js is not installed.
    echo   Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
npm --version
echo.

REM Create .env.local
echo Setting up environment variables...
if exist ".env.local" (
    echo [SKIP] .env.local already exists
) else (
    copy .env.example .env.local >nul
    echo [OK] Created .env.local
    echo.
    echo IMPORTANT: Edit .env.local with your Supabase credentials
    echo   VITE_SUPABASE_URL=your_supabase_url
    echo   VITE_SUPABASE_ANON_KEY=your_anon_key
    echo.
)

REM Install dependencies
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo X Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

REM Check .gitignore
echo Securing credentials...
findstr /M ".env.local" .gitignore >nul 2>&1
if %errorlevel% neq 0 (
    echo .env.local >> .gitignore
    echo [OK] Added .env.local to .gitignore
) else (
    echo [OK] .env.local is already in .gitignore
)

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Edit .env.local with your Supabase credentials
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
echo Documentation:
echo - Setup Guide: SETUP_GUIDE.md
echo - Full Docs: README.md
echo - Troubleshooting: TROUBLESHOOTING.md
echo.
pause
