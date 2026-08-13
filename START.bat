@echo off
title Ahsan Sattar - Portfolio
cd /d "%~dp0"

echo.
echo  ============================================================
echo    Ahsan Sattar - Portfolio
echo  ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo  [X] Node.js is not installed.
  echo      Get the LTS version from https://nodejs.org
  echo      then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo  First run - installing packages. This takes a few minutes...
  echo.
  call npm install
  echo.
)

echo  Starting the site...
echo.
echo  ^>^>  Your site will open at:  http://localhost:3000
echo.
echo  Keep this window OPEN while you work.
echo  Press Ctrl+C here to stop the server.
echo.

start "" cmd /c "timeout /t 6 >nul & start http://localhost:3000"
call npm run dev

echo.
echo  The server has stopped.
pause
