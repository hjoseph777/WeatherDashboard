# ================================================================
# PrinceXML Windows System PATH Setup Script
# Run as Administrator for system-wide PATH modification
# ================================================================

Write-Host "🚀 PrinceXML Windows System PATH Setup" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Define the PrinceXML path
$PRINCE_PATH = "C:\Program Files\Prince\engine\bin"
$PRINCE_EXE = Join-Path $PRINCE_PATH "prince.exe"

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

Write-Host "👤 Administrator Status: " -NoNewline
if ($isAdmin) {
    Write-Host "✅ Running as Administrator" -ForegroundColor Green
} else {
    Write-Host "❌ NOT running as Administrator" -ForegroundColor Red
    Write-Host ""
    Write-Host "⚠️  To modify System PATH, this script must run as Administrator:" -ForegroundColor Yellow
    Write-Host "   • Right-click PowerShell → 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host "   • Or use User PATH modification (limited scope)" -ForegroundColor Yellow
    Write-Host ""
}

# Check if PrinceXML is installed
Write-Host "📍 Checking PrinceXML installation..."
if (Test-Path $PRINCE_EXE) {
    Write-Host "✅ PrinceXML found at: $PRINCE_PATH" -ForegroundColor Green
    
    # Test the executable
    try {
        $version = & $PRINCE_EXE --version 2>$null
        Write-Host "✅ Version: $version" -ForegroundColor Green
    } catch {
        Write-Host "❌ PrinceXML executable not working" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ PrinceXML not found at: $PRINCE_EXE" -ForegroundColor Red
    Write-Host "💡 Please install from: https://www.princexml.com/download/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check current PATH status
Write-Host "🔍 Current PATH Status:"
$currentSystemPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
$currentUserPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($currentSystemPath -like "*$PRINCE_PATH*") {
    Write-Host "✅ PrinceXML already in System PATH" -ForegroundColor Green
    $inSystemPath = $true
} else {
    Write-Host "❌ PrinceXML NOT in System PATH" -ForegroundColor Red
    $inSystemPath = $false
}

if ($currentUserPath -like "*$PRINCE_PATH*") {
    Write-Host "✅ PrinceXML already in User PATH" -ForegroundColor Green
    $inUserPath = $true
} else {
    Write-Host "❌ PrinceXML NOT in User PATH" -ForegroundColor Red
    $inUserPath = $false
}

# Test if prince is accessible from current session
Write-Host ""
Write-Host "🧪 Testing current accessibility:"
try {
    $currentPrince = Get-Command prince -ErrorAction SilentlyContinue
    if ($currentPrince) {
        Write-Host "✅ 'prince' command accessible: $($currentPrince.Source)" -ForegroundColor Green
    } else {
        Write-Host "❌ 'prince' command not accessible in current session" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ 'prince' command not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔧 PATH Modification Options:" -ForegroundColor Cyan

# Option 1: System PATH (requires admin)
if ($isAdmin -and -not $inSystemPath) {
    Write-Host ""
    Write-Host "1️⃣  SYSTEM PATH (Recommended - All Users)" -ForegroundColor Yellow
    Write-Host "   This will make PrinceXML available to ALL applications including VS Code"
    
    $response = Read-Host "   Add PrinceXML to System PATH? (y/N)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        try {
            $newSystemPath = $currentSystemPath + ";" + $PRINCE_PATH
            [Environment]::SetEnvironmentVariable("Path", $newSystemPath, "Machine")
            Write-Host "   ✅ Added PrinceXML to System PATH" -ForegroundColor Green
            Write-Host "   🔄 Restart VS Code to apply changes" -ForegroundColor Yellow
            $pathModified = $true
        } catch {
            Write-Host "   ❌ Failed to modify System PATH: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
} elseif ($inSystemPath) {
    Write-Host "1️⃣  ✅ System PATH already configured" -ForegroundColor Green
} else {
    Write-Host "1️⃣  ⚠️  System PATH requires Administrator privileges" -ForegroundColor Yellow
}

# Option 2: User PATH (no admin required)
if (-not $inUserPath) {
    Write-Host ""
    Write-Host "2️⃣  USER PATH (Current User Only)" -ForegroundColor Yellow
    Write-Host "   This will make PrinceXML available for your user account"
    
    $response = Read-Host "   Add PrinceXML to User PATH? (y/N)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        try {
            $newUserPath = if ($currentUserPath) { $currentUserPath + ";" + $PRINCE_PATH } else { $PRINCE_PATH }
            [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
            Write-Host "   ✅ Added PrinceXML to User PATH" -ForegroundColor Green
            Write-Host "   🔄 Restart VS Code to apply changes" -ForegroundColor Yellow
            $pathModified = $true
        } catch {
            Write-Host "   ❌ Failed to modify User PATH: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
} else {
    Write-Host "2️⃣  ✅ User PATH already configured" -ForegroundColor Green
}

# Final verification
Write-Host ""
Write-Host "🧪 Final Verification:" -ForegroundColor Cyan

if ($pathModified) {
    Write-Host "⚠️  PATH was modified - restart PowerShell/VS Code to test" -ForegroundColor Yellow
} else {
    # Test in a new process to simulate fresh environment
    try {
        $testResult = powershell -Command "prince --version" 2>$null
        if ($testResult) {
            Write-Host "✅ PrinceXML accessible in new process" -ForegroundColor Green
            Write-Host "📋 Version: $testResult" -ForegroundColor Green
        } else {
            Write-Host "❌ PrinceXML not accessible in new process" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "• Restart VS Code completely" -ForegroundColor White
Write-Host "• Right-click any .md file → 'Export (Prince)'" -ForegroundColor White
Write-Host "• Or use Command Palette: Ctrl+Shift+P → 'Prince'" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Working Alternatives (available now):" -ForegroundColor Cyan
Write-Host "• python convert_condensed.py" -ForegroundColor White
Write-Host "• python prince_converter.py" -ForegroundColor White
Write-Host "• VS Code Tasks: Ctrl+Shift+P → 'Tasks: Run Task'" -ForegroundColor White

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "PrinceXML Setup Complete!" -ForegroundColor Green