@echo off
title Launching CHINARMIST Website...
echo ===========================================
echo Starting CHINARMIST Website Server at http://localhost:5173 ...
echo ===========================================
cd /d "%~dp0"

REM Launch Chrome after 3 seconds delay in background so Vite has time to start
start /b "" powershell -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:5173/'"

REM Run Vite development server
cmd /c npm.cmd run dev
pause
