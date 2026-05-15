@echo off
setlocal

set "APP_URL=file:///C:/Users/kdeal/Desktop/backup/code/xingce-assistant/index.html"
set "CHROME=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "EDGE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

if exist "%CHROME%" (
	start "" "%CHROME%" --app="%APP_URL%" --window-size=680,640 --window-position=160,90
	exit /b
)

if exist "%EDGE%" (
	start "" "%EDGE%" --app="%APP_URL%" --window-size=680,640 --window-position=160,90
	exit /b
)

echo Chrome or Edge was not found.
pause
