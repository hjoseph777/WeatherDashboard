@echo off
echo.
echo ========================================
echo   PrinceXML Installation Helper
echo ========================================
echo.

echo Checking if PrinceXML is already installed...
where prince >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ PrinceXML is already installed!
    prince --version
    echo.
    echo Ready to convert your markdown to PDF!
    echo Run: python prince_converter.py
) else (
    echo ❌ PrinceXML not found
    echo.
    echo 📥 To install PrinceXML:
    echo 1. Go to: https://www.princexml.com/download/
    echo 2. Click "Download Prince for Windows"
    echo 3. Choose the 64-bit version
    echo 4. Run the installer with default settings
    echo 5. Restart your terminal/VS Code after installation
    echo.
    echo 💡 PrinceXML is FREE for non-commercial use (perfect for academic projects!)
)

echo.
echo ========================================
pause