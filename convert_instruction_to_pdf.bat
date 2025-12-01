@echo off
echo ================================================
echo     Markdown to PDF Converter for CPAN 213
echo     Converting Instruction.md to Instruction.pdf
echo ================================================
echo.

REM Check if Instruction.md exists
if not exist "Instruction.md" (
    echo ERROR: Instruction.md not found in current directory
    echo Please make sure you're in the correct folder
    pause
    exit /b 1
)

echo Starting conversion process...
echo.

REM Run the reliable Python conversion script
echo 1. Creating HTML version...
python quick_convert.py

echo.
echo 2. Attempting automatic PDF conversion...
powershell -ExecutionPolicy Bypass -File "Convert-ToPDF.ps1"

echo.
echo ================================================

REM Check if PDF was created
if exist "Instruction.pdf" (
    echo SUCCESS: Instruction.pdf has been created!
    echo File location: %CD%\Instruction.pdf
    echo.
    echo Opening the PDF file...
    start "" "Instruction.pdf"
) else if exist "Instruction.html" (
    echo HTML version created: Instruction.html
    echo Please open this file in your browser and use Print to PDF
    echo.
    echo Opening the HTML file...
    start "" "Instruction.html"
) else (
    echo No output file was created. Please check the error messages above.
)

echo.
echo Press any key to close...
pause >nul