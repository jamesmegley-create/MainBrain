@echo off
rem Sync Ironframe site preview from canonical 04 Website folder
set "SRC=..\..\..\AI Consulting Brand\04 Website"
copy /Y "%SRC%\index.html" site\ >nul
copy /Y "%SRC%\style.css" site\ >nul
copy /Y "%SRC%\main.js" site\ >nul
copy /Y "%SRC%\config.js" site\ >nul
copy /Y "%SRC%\resume.html" site\ >nul
copy /Y "%SRC%\checkout.html" site\ >nul
copy /Y "%SRC%\success.html" site\ >nul
copy /Y "%SRC%\cancel.html" site\ >nul
copy /Y "%SRC%\404.html" site\ >nul
copy /Y "%SRC%\favicon.svg" site\ >nul
copy /Y "%SRC%\favicon.ico" site\ >nul
copy /Y "%SRC%\favicon-16x16.png" site\ >nul
copy /Y "%SRC%\favicon-32x32.png" site\ >nul
copy /Y "%SRC%\apple-touch-icon.png" site\ >nul
copy /Y "%SRC%\og.png" site\ >nul
copy /Y "%SRC%\site.webmanifest" site\ >nul
copy /Y "%SRC%\robots.txt" site\ >nul
copy /Y "%SRC%\sitemap.xml" site\ >nul
echo Ironframe site preview synced (18 files).
rem Note: api/ functions are NOT mirrored - they only run on Vercel.
rem The preview checkout page shows its graceful fallback here, which is correct.
