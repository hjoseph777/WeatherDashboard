# WeatherDashboard Team Setup Guide

## 🎯 Required Versions for Team Consistency

### Core Requirements

| Tool | Version | Installation Command |
|------|---------|---------------------|
| **Node.js** | `v20.19.4` | Download from [nodejs.org](https://nodejs.org/) |
| **npm** | `v11.6.2` | Comes with Node.js |
| **Git** | Latest stable | Download from [git-scm.com](https://git-scm.com/) |

### Expo Setup

| Tool | Version | Installation Command |
|------|---------|---------------------|
| **@expo/cli** | `54.0.12` | `npm install -g @expo/cli` |
| **Expo SDK** | `54.0.16` | Already in project |

### Project Dependencies (Already Configured)

| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | `~54.0.16` | Expo framework |
| `react` | `19.1.0` | React library |
| `react-native` | `0.81.4` | React Native framework |
| `@react-navigation/native` | `7.1.18` | Navigation core |
| `@react-navigation/stack` | `7.4.10` | Stack navigation |
| `react-native-screens` | `~4.16.0` | Native screen handling |
| `react-native-safe-area-context` | `~5.6.0` | Safe area management |
| `expo-status-bar` | `~3.0.8` | Status bar component |

## 🚀 Team Setup Instructions

### Step 1: Install Node.js
```bash
# Download and install Node.js v20.19.4 from nodejs.org
# Verify installation:
node --version  # Should show v20.19.4
npm --version   # Should show 11.6.2
```

### Step 2: Install Git
```bash
# Download from git-scm.com
# Verify installation:
git --version
```

### Step 3: Install Expo CLI
```bash
# Remove old expo-cli if installed
npm uninstall -g expo-cli

# Install new Expo CLI
npm install -g @expo/cli

# Verify installation:
npx @expo/cli --version  # Should show 54.0.12
```

### Step 4: Clone and Setup Project
```bash
# Clone the repository (replace with your actual repo URL)
git clone <your-repo-url> WeatherDashboard
cd WeatherDashboard

# Install project dependencies
npm install

# Verify everything is working
npx expo start
```

## 📱 Development Tools (Optional but Recommended)

### Mobile Testing
| Tool | Purpose | Installation |
|------|---------|--------------|
| **Expo Go** | Test on real device | Download from App Store/Play Store |
| **Android Studio** | Android emulator | Download from developer.android.com |
| **Xcode** | iOS simulator (Mac only) | Download from Mac App Store |

### Code Editor
| Tool | Purpose | Extensions |
|------|---------|------------|
| **VS Code** | Recommended editor | ES7+ React/Redux/RN snippets, Expo Tools |

## 🔄 Development Workflow

### Starting Development
```bash
cd WeatherDashboard
npx expo start
```

### Available Commands
```bash
npx expo start          # Start development server
npx expo start --web    # Start web version
npx expo start --android # Start Android
npx expo start --ios    # Start iOS (Mac only)
npx expo install <package> # Install Expo-compatible packages
```

## 🛠️ Troubleshooting

### Common Issues

1. **Node Version Mismatch**
   ```bash
   # Use nvm to manage Node versions
   # Windows: Download nvm-windows
   # Mac/Linux: Use nvm
   nvm install 20.19.4
   nvm use 20.19.4
   ```

2. **Cache Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Clear Expo cache
   npx expo r -c
   ```

3. **Package Installation Issues**
   ```bash
   # Delete and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📋 Pre-Development Checklist

Before starting development, ensure:

- [ ] Node.js v20.19.4 installed
- [ ] npm v11.6.2 installed  
- [ ] Git installed and configured
- [ ] @expo/cli v54.0.12 installed globally
- [ ] Project cloned and dependencies installed
- [ ] `npx expo start` works without errors
- [ ] Can access app via Expo Go or web browser

## 🔒 Environment Variables (if needed)

Create a `.env` file in the project root for any API keys:
```bash
# Example for weather API
WEATHER_API_KEY=your_api_key_here
WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

## 📞 Team Communication

- **Primary IDE**: VS Code
- **Package Manager**: npm (not yarn)
- **Expo CLI**: Use `npx @expo/cli` commands
- **Testing**: Use Expo Go app for mobile testing

---

## 🎯 Quick Verification Script

Run this to verify your setup:
```bash
echo "Node version:" && node --version
echo "npm version:" && npm --version  
echo "Expo CLI version:" && npx @expo/cli --version
echo "Git version:" && git --version
echo "Project dependencies:" && npm list --depth=0
```

Expected output:
```
Node version: v20.19.4
npm version: 11.6.2
Expo CLI version: 54.0.12
Git version: git version X.X.X
Project dependencies: [list of installed packages]
```

---

**Last Updated**: October 21, 2025
**Project**: WeatherDashboard
**Team Setup Version**: 1.0