#!/bin/bash

# WeatherDashboard Team Environment Verification Script
# Run this script to verify your development environment

echo "🔍 WeatherDashboard Team Environment Check"
echo "=========================================="
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
NODE_VERSION=$(node --version 2>/dev/null)
if [ $? -eq 0 ]; then
    if [ "$NODE_VERSION" = "v20.19.4" ]; then
        echo "✅ Node.js: $NODE_VERSION (Correct version)"
    else
        echo "⚠️  Node.js: $NODE_VERSION (Expected: v20.19.4)"
    fi
else
    echo "❌ Node.js: Not installed"
fi

# Check npm
echo ""
echo "📦 Checking npm..."
NPM_VERSION=$(npm --version 2>/dev/null)
if [ $? -eq 0 ]; then
    if [ "$NPM_VERSION" = "11.6.2" ]; then
        echo "✅ npm: $NPM_VERSION (Correct version)"
    else
        echo "⚠️  npm: $NPM_VERSION (Expected: 11.6.2)"
    fi
else
    echo "❌ npm: Not installed"
fi

# Check Git
echo ""
echo "📦 Checking Git..."
GIT_VERSION=$(git --version 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Git: $GIT_VERSION"
else
    echo "❌ Git: Not installed"
fi

# Check Expo CLI
echo ""
echo "📦 Checking Expo CLI..."
EXPO_VERSION=$(npx @expo/cli --version 2>/dev/null)
if [ $? -eq 0 ]; then
    if [ "$EXPO_VERSION" = "54.0.12" ]; then
        echo "✅ Expo CLI: $EXPO_VERSION (Correct version)"
    else
        echo "⚠️  Expo CLI: $EXPO_VERSION (Expected: 54.0.12)"
    fi
else
    echo "❌ Expo CLI: Not installed properly"
fi

# Check if we're in project directory
echo ""
echo "📦 Checking project setup..."
if [ -f "package.json" ]; then
    echo "✅ Found package.json"
    
    # Check if node_modules exists
    if [ -d "node_modules" ]; then
        echo "✅ Dependencies installed"
    else
        echo "⚠️  Dependencies not installed. Run: npm install"
    fi
    
    # Check key dependencies
    if npm list expo > /dev/null 2>&1; then
        echo "✅ Expo SDK installed"
    else
        echo "❌ Expo SDK not found"
    fi
    
    if npm list @react-navigation/native > /dev/null 2>&1; then
        echo "✅ React Navigation installed"
    else
        echo "❌ React Navigation not found"
    fi
else
    echo "❌ Not in WeatherDashboard project directory"
fi

echo ""
echo "=========================================="
echo "🎯 Environment Check Complete!"
echo ""
echo "If you see any ❌ or ⚠️, please refer to TEAM_SETUP_GUIDE.md"
echo "All team members should have ✅ for all checks."