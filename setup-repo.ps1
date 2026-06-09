# The Wandering Man — repo setup
# Run this once from D:\Claude Stuff\wandering
# Right-click → "Run with PowerShell"

Set-Location $PSScriptRoot

Write-Host "Initialising git repo..." -ForegroundColor Green
git init
git branch -M main

Write-Host "Creating initial files..." -ForegroundColor Green
New-Item -ItemType File -Name ".gitkeep" -Force | Out-Null

git add .
git commit -m "init: project scaffold"

Write-Host "Connecting to GitHub..." -ForegroundColor Green
git remote add origin https://github.com/alejandrofergu/thewanderingman.git

Write-Host ""
Write-Host "Done! Now create the repo on GitHub at:" -ForegroundColor Cyan
Write-Host "https://github.com/new" -ForegroundColor Yellow
Write-Host ""
Write-Host "Repo name: thewanderingman" -ForegroundColor Yellow
Write-Host "Set it to Public or Private, then run:" -ForegroundColor Cyan
Write-Host "  git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close"
