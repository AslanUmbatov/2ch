@echo off
title 3ch Launcher
echo Starting 3ch application...
echo Navigate to http://localhost:3000 in your browser after the server starts.

cd app
if %errorlevel% neq 0 (
    echo Error: 'app' directory not found.
    pause
    exit /b %errorlevel%
)

call npm run dev
pause
