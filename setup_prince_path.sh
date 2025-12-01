#!/bin/bash

# =================================================================
# PrinceXML PATH Setup Script for Windows (Git Bash/MSYS2)
# =================================================================

echo "🚀 PrinceXML PATH Configuration Script"
echo "======================================"

# Define paths
PRINCE_PATH="/c/Program Files/Prince/engine/bin"
PRINCE_EXE="$PRINCE_PATH/prince.exe"

echo "📍 Checking PrinceXML installation..."

# Check if PrinceXML exists
if [[ -f "$PRINCE_EXE" ]]; then
    echo "✅ PrinceXML found at: $PRINCE_PATH"
    
    # Test the executable
    VERSION_OUTPUT=$("$PRINCE_EXE" --version 2>/dev/null)
    if [[ $? -eq 0 ]]; then
        echo "✅ PrinceXML version: $VERSION_OUTPUT"
    else
        echo "❌ PrinceXML executable not working properly"
        exit 1
    fi
else
    echo "❌ PrinceXML not found at expected location: $PRINCE_EXE"
    echo "💡 Please install PrinceXML from: https://www.princexml.com/download/"
    exit 1
fi

echo ""
echo "🔍 Current PATH status:"

# Check if prince is already in PATH
if command -v prince &> /dev/null; then
    CURRENT_PRINCE=$(which prince)
    echo "✅ Prince found in PATH: $CURRENT_PRINCE"
    
    # Verify it's the correct version
    CURRENT_VERSION=$(prince --version 2>/dev/null)
    echo "📋 Current version: $CURRENT_VERSION"
else
    echo "❌ Prince not found in current PATH"
fi

echo ""
echo "🔧 PATH Configuration Options:"
echo ""

# =================================================================
# Option 1: Temporary PATH (current session only)
# =================================================================
echo "1️⃣  TEMPORARY PATH (Current Session Only)"
echo "   Add prince to PATH for this terminal session:"
echo ""
echo "   export PATH=\"$PRINCE_PATH:\$PATH\""
echo ""

# =================================================================
# Option 2: Persistent PATH via .bashrc
# =================================================================
echo "2️⃣  PERSISTENT PATH (Bash Sessions)"
echo "   Add to ~/.bashrc for all future bash sessions:"
echo ""

# Check if .bashrc exists
if [[ -f ~/.bashrc ]]; then
    # Check if prince path is already in .bashrc
    if grep -q "Prince/engine/bin" ~/.bashrc; then
        echo "   ✅ PrinceXML PATH already exists in ~/.bashrc"
    else
        echo "   📝 Adding PrinceXML to ~/.bashrc..."
        echo ""
        echo "# PrinceXML PATH" >> ~/.bashrc
        echo "export PATH=\"$PRINCE_PATH:\$PATH\"" >> ~/.bashrc
        echo "   ✅ Added PrinceXML PATH to ~/.bashrc"
        echo "   🔄 Run 'source ~/.bashrc' or restart terminal to apply"
    fi
else
    echo "   📝 Creating ~/.bashrc and adding PrinceXML PATH..."
    echo "# PrinceXML PATH" > ~/.bashrc
    echo "export PATH=\"$PRINCE_PATH:\$PATH\"" >> ~/.bashrc
    echo "   ✅ Created ~/.bashrc with PrinceXML PATH"
fi

echo ""

# =================================================================
# Option 3: Windows System PATH (requires admin)
# =================================================================
echo "3️⃣  WINDOWS SYSTEM PATH (Permanent - All Applications)"
echo "   For VS Code right-click export to work, add to Windows PATH:"
echo ""
echo "   Manual Steps:"
echo "   • Press Win + R, type 'sysdm.cpl', press Enter"
echo "   • Click 'Environment Variables'"
echo "   • In 'System Variables', find 'Path' → Edit"
echo "   • Click 'New' and add: C:\\Program Files\\Prince\\engine\\bin"
echo "   • Click OK, restart VS Code"
echo ""

# =================================================================
# Option 4: Apply temporary PATH now
# =================================================================
echo "4️⃣  APPLY TEMPORARY PATH NOW"
echo "   Apply prince PATH for this session:"

# Apply temporary PATH
export PATH="$PRINCE_PATH:$PATH"

echo "   ✅ PrinceXML temporarily added to PATH"
echo ""

# Test the updated PATH
echo "🧪 Testing updated PATH..."
if command -v prince &> /dev/null; then
    echo "✅ SUCCESS: 'prince' command now available!"
    echo "📋 Version: $(prince --version)"
    
    echo ""
    echo "🎯 Quick Test - Convert instruction2_condensed.md:"
    if [[ -f "instruction2_condensed.md" ]]; then
        echo "   prince instruction2_condensed.md -o test_output.pdf"
        prince instruction2_condensed.md -o test_output.pdf 2>/dev/null
        
        if [[ -f "test_output.pdf" ]]; then
            FILE_SIZE=$(stat -c%s "test_output.pdf" 2>/dev/null || stat -f%z "test_output.pdf" 2>/dev/null || echo "unknown")
            echo "   ✅ Test PDF created: test_output.pdf (${FILE_SIZE} bytes)"
            rm -f test_output.pdf  # Clean up test file
        else
            echo "   ❌ Test PDF creation failed"
        fi
    else
        echo "   📄 instruction2_condensed.md not found in current directory"
    fi
else
    echo "❌ FAILED: 'prince' command still not available"
fi

echo ""
echo "=" * 50
echo "🎯 SUMMARY & RECOMMENDATIONS:"
echo ""

if command -v prince &> /dev/null; then
    echo "✅ PrinceXML is now available in this terminal session"
    echo "💡 To make permanent for bash sessions: source ~/.bashrc"
    echo "💡 For VS Code right-click: Add to Windows System PATH (Option 3)"
else
    echo "❌ PrinceXML setup incomplete"
    echo "💡 Try running: source ~/.bashrc"
    echo "💡 Or manually export PATH: export PATH=\"$PRINCE_PATH:\$PATH\""
fi

echo ""
echo "🔗 Working Alternatives:"
echo "   • python prince_converter.py (works now)"
echo "   • python convert_condensed.py (works now)"
echo "   • VS Code Task: Ctrl+Shift+P → 'Tasks: Run Task'"
echo ""
echo "======================================"