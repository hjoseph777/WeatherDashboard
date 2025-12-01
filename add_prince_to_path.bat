@echo off
echo.
echo ========================================
echo   Adding PrinceXML to Windows PATH
echo ========================================
echo.

echo Current PATH status for Prince:
where prince 2>nul && echo ✅ Prince already in PATH || echo ❌ Prince not found in PATH

echo.
echo 📝 To add PrinceXML to your system PATH:
echo.
echo 1. Press Win + R, type "sysdm.cpl" and press Enter
echo 2. Click "Environment Variables..." button
echo 3. In "System Variables", find and select "Path", then click "Edit..."
echo 4. Click "New" and add this path:
echo    C:\Program Files\Prince\engine\bin
echo 5. Click OK on all dialogs
echo 6. Restart VS Code completely
echo.
echo 🔄 Alternative: Use our Python script that already works!
echo    Run: python prince_converter.py
echo.

echo Testing full path to Prince:
"C:\Program Files\Prince\engine\bin\prince.exe" --version 2>nul && echo ✅ Prince executable works || echo ❌ Prince executable not found

echo.
pause