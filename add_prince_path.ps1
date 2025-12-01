# PrinceXML Windows PATH Setup Script
# Run as Administrator for system-wide access

Write-Host "PrinceXML Windows System PATH Setup"
Write-Host "===================================="
Write-Host ""

$PRINCE_PATH = "C:\Program Files\Prince\engine\bin"
$PRINCE_EXE = "$PRINCE_PATH\prince.exe"

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

Write-Host "Administrator Status: " -NoNewline
if ($isAdmin) {
    Write-Host "YES - Can modify System PATH" -ForegroundColor Green
} else {
    Write-Host "NO - Can only modify User PATH" -ForegroundColor Yellow
}
Write-Host ""

# Check PrinceXML installation
Write-Host "Checking PrinceXML installation..."
if (Test-Path $PRINCE_EXE) {
    Write-Host "FOUND: PrinceXML at $PRINCE_PATH" -ForegroundColor Green
    
    try {
        $version = & $PRINCE_EXE --version 2>$null
        Write-Host "Version: $version" -ForegroundColor Green
    } catch {
        Write-Host "ERROR: PrinceXML not working" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ERROR: PrinceXML not found" -ForegroundColor Red
    Write-Host "Install from: https://www.princexml.com/download/"
    exit 1
}

Write-Host ""

# Check current PATH
Write-Host "Checking current PATH status..."
$systemPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")

$inSystemPath = $systemPath -like "*$PRINCE_PATH*"
$inUserPath = $userPath -like "*$PRINCE_PATH*"

if ($inSystemPath) {
    Write-Host "System PATH: ALREADY CONFIGURED" -ForegroundColor Green
} else {
    Write-Host "System PATH: NOT CONFIGURED" -ForegroundColor Red
}

if ($inUserPath) {
    Write-Host "User PATH: ALREADY CONFIGURED" -ForegroundColor Green
} else {
    Write-Host "User PATH: NOT CONFIGURED" -ForegroundColor Red
}

Write-Host ""

# Modify PATH
if ($isAdmin -and -not $inSystemPath) {
    Write-Host "Adding PrinceXML to System PATH (All Users)..."
    try {
        $newPath = $systemPath + ";" + $PRINCE_PATH
        [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
        Write-Host "SUCCESS: Added to System PATH" -ForegroundColor Green
        Write-Host "RESTART VS Code to apply changes" -ForegroundColor Yellow
    } catch {
        Write-Host "ERROR: Failed to modify System PATH" -ForegroundColor Red
    }
} elseif (-not $inUserPath) {
    Write-Host "Adding PrinceXML to User PATH (Current User)..."
    try {
        $newPath = if ($userPath) { $userPath + ";" + $PRINCE_PATH } else { $PRINCE_PATH }
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
        Write-Host "SUCCESS: Added to User PATH" -ForegroundColor Green
        Write-Host "RESTART VS Code to apply changes" -ForegroundColor Yellow
    } catch {
        Write-Host "ERROR: Failed to modify User PATH" -ForegroundColor Red
    }
} else {
    Write-Host "PrinceXML already in PATH - no changes needed" -ForegroundColor Green
}

Write-Host ""
Write-Host "===================================="
Write-Host "Setup Complete!"
Write-Host ""
Write-Host "Next Steps:"
Write-Host "1. Restart VS Code completely"
Write-Host "2. Right-click any .md file -> Export to PDF (Prince)"
Write-Host "3. Or use working alternatives:"
Write-Host "   - python convert_condensed.py"
Write-Host "   - python prince_converter.py"