#!/bin/bash
# Final verification script for PrinceXML setup

echo "🧪 PrinceXML Setup Verification"
echo "==============================="
echo ""

# Test 1: Bash PATH
echo "1️⃣ Testing Bash PATH:"
if command -v prince &> /dev/null; then
    echo "   ✅ prince command available in bash"
    echo "   📍 Location: $(which prince)"
    echo "   📋 Version: $(prince --version)"
else
    echo "   ❌ prince not found in bash PATH"
fi
echo ""

# Test 2: PowerShell PATH (simulates VS Code environment)
echo "2️⃣ Testing PowerShell PATH (VS Code environment):"
POWERSHELL_TEST=$(PowerShell.exe -Command "Get-Command prince -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source" 2>/dev/null)
if [[ -n "$POWERSHELL_TEST" ]]; then
    echo "   ✅ prince command available in PowerShell"
    echo "   📍 Location: $POWERSHELL_TEST"
    POWERSHELL_VERSION=$(PowerShell.exe -Command "prince --version" 2>/dev/null)
    echo "   📋 Version: $POWERSHELL_VERSION"
else
    echo "   ❌ prince not found in PowerShell PATH"
    echo "   💡 Restart VS Code to apply PATH changes"
fi
echo ""

# Test 3: Direct conversion tests
echo "3️⃣ Testing conversion methods:"

# Test direct prince command
echo "   Testing: prince instruction2_condensed.md -o test1.pdf"
if prince instruction2_condensed.md -o test1.pdf 2>/dev/null; then
    if [[ -f test1.pdf ]]; then
        SIZE=$(stat -c%s test1.pdf 2>/dev/null || stat -f%z test1.pdf 2>/dev/null)
        echo "   ✅ Direct conversion: test1.pdf ($SIZE bytes)"
        rm -f test1.pdf
    fi
else
    echo "   ❌ Direct conversion failed"
fi

# Test Python converters
echo "   Testing: python convert_condensed.py"
if python convert_condensed.py >/dev/null 2>&1; then
    echo "   ✅ Python converter working"
else
    echo "   ❌ Python converter failed"
fi

echo ""

# Current files status
echo "4️⃣ Current PDF files:"
ls -la *.pdf 2>/dev/null | while read line; do
    echo "   📄 $line"
done

echo ""
echo "==============================="
echo "🎯 Summary:"
echo ""

# Overall status
BASH_OK=$(command -v prince &> /dev/null && echo "true" || echo "false")
POWERSHELL_OK=$(PowerShell.exe -Command "Get-Command prince -ErrorAction SilentlyContinue" &>/dev/null && echo "true" || echo "false")

if [[ "$BASH_OK" == "true" && "$POWERSHELL_OK" == "true" ]]; then
    echo "🟢 EXCELLENT: PrinceXML fully configured"
    echo "   • Bash terminal: Ready ✅"
    echo "   • VS Code integration: Ready ✅" 
    echo "   • Right-click export: Should work ✅"
elif [[ "$BASH_OK" == "true" ]]; then
    echo "🟡 PARTIAL: PrinceXML configured for bash"
    echo "   • Bash terminal: Ready ✅"
    echo "   • VS Code integration: Restart required 🔄"
    echo "   • Right-click export: Restart VS Code"
else
    echo "🔴 ISSUE: PrinceXML not fully configured"
    echo "   • Check installation"
    echo "   • Run setup scripts again"
fi

echo ""
echo "🔗 Available conversion methods:"
echo "   • prince instruction2_condensed.md -o output.pdf"
echo "   • python convert_condensed.py"  
echo "   • python prince_converter.py"
echo "   • VS Code Tasks: Ctrl+Shift+P → 'Tasks: Run Task'"
echo ""
echo "==============================="