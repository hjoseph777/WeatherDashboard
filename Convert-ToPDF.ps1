# PowerShell Script to Convert HTML to PDF using Edge/Chrome
# Usage: Run this script after generating Instruction.html

param(
    [string]$InputFile = "Instruction.html",
    [string]$OutputFile = "Instruction.pdf"
)

Write-Host "🚀 PowerShell HTML to PDF Converter" -ForegroundColor Green
Write-Host "=================================="

# Check if input file exists
if (-not (Test-Path $InputFile)) {
    Write-Host "❌ Error: $InputFile not found" -ForegroundColor Red
    Write-Host "Please run 'python quick_convert.py' first" -ForegroundColor Yellow
    exit 1
}

Write-Host "📄 Input file: $InputFile" -ForegroundColor Cyan
Write-Host "🎯 Output file: $OutputFile" -ForegroundColor Cyan

# Get full path for the HTML file
$FullHtmlPath = (Resolve-Path $InputFile).Path
$FileUri = "file:///$($FullHtmlPath.Replace('\', '/'))"

Write-Host "🔍 File URI: $FileUri" -ForegroundColor Gray

# Try to use Microsoft Edge for PDF conversion
$EdgePath = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $EdgePath)) {
    $EdgePath = "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
}

# Try to use Google Chrome as fallback
$ChromePath = "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $ChromePath)) {
    $ChromePath = "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
}

$ConversionSuccessful = $false

# Try Edge first (headless PDF generation)
if (Test-Path $EdgePath) {
    Write-Host "🌐 Attempting conversion with Microsoft Edge..." -ForegroundColor Yellow
    
    try {
        $EdgeArgs = @(
            "--headless"
            "--disable-gpu"
            "--run-all-compositor-stages-before-draw"
            "--print-to-pdf=$OutputFile"
            "--print-to-pdf-no-header"
            "--virtual-time-budget=10000"
            $FileUri
        )
        
        Start-Process -FilePath $EdgePath -ArgumentList $EdgeArgs -Wait -NoNewWindow
        
        if (Test-Path $OutputFile) {
            $FileSize = (Get-Item $OutputFile).Length
            Write-Host "✅ PDF created successfully with Edge!" -ForegroundColor Green
            Write-Host "📊 File size: $($FileSize) bytes" -ForegroundColor Cyan
            $ConversionSuccessful = $true
        }
    }
    catch {
        Write-Host "⚠️ Edge conversion failed: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Try Chrome if Edge failed
if (-not $ConversionSuccessful -and (Test-Path $ChromePath)) {
    Write-Host "🌐 Attempting conversion with Google Chrome..." -ForegroundColor Yellow
    
    try {
        $ChromeArgs = @(
            "--headless"
            "--disable-gpu"
            "--run-all-compositor-stages-before-draw"
            "--print-to-pdf=$OutputFile"
            "--print-to-pdf-no-header"
            "--virtual-time-budget=10000"
            $FileUri
        )
        
        Start-Process -FilePath $ChromePath -ArgumentList $ChromeArgs -Wait -NoNewWindow
        
        if (Test-Path $OutputFile) {
            $FileSize = (Get-Item $OutputFile).Length
            Write-Host "✅ PDF created successfully with Chrome!" -ForegroundColor Green
            Write-Host "📊 File size: $($FileSize) bytes" -ForegroundColor Cyan
            $ConversionSuccessful = $true
        }
    }
    catch {
        Write-Host "⚠️ Chrome conversion failed: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# If automatic conversion failed, provide manual instructions
if (-not $ConversionSuccessful) {
    Write-Host "🔧 Automatic conversion not available" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Manual conversion steps:" -ForegroundColor Cyan
    Write-Host "1. Open $InputFile in your browser" -ForegroundColor White
    Write-Host "2. Press Ctrl+P to print" -ForegroundColor White
    Write-Host "3. Select 'Save as PDF'" -ForegroundColor White
    Write-Host "4. Save as '$OutputFile'" -ForegroundColor White
    Write-Host ""
    
    # Try to open the HTML file in default browser
    Write-Host "🌐 Opening HTML file in default browser..." -ForegroundColor Yellow
    try {
        Start-Process $InputFile
        Write-Host "✅ Browser opened successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to open browser: $($_.Exception.Message)" -ForegroundColor Red
    }
}
else {
    # Open the created PDF
    Write-Host "📂 Opening created PDF..." -ForegroundColor Yellow
    try {
        Start-Process $OutputFile
        Write-Host "✅ PDF opened successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️ Could not open PDF automatically" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=================================="
Write-Host "✨ Conversion process completed!" -ForegroundColor Green

if ($ConversionSuccessful) {
    Write-Host "🎉 Your PDF is ready for CPAN 213 submission!" -ForegroundColor Green
} else {
    Write-Host "📌 Complete the conversion using browser Print-to-PDF" -ForegroundColor Cyan
}