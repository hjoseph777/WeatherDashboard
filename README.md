# Weather Dashboard - React Native App

## Project Metadata
- Author: CPAN 213 Group 14
- Course: CPAN 213 Mobile App Development
- Created: 2025-12-01
- Platform: Expo (React Native + Expo Router)
- Package Manager: npm
- Minimum React Native version: 0.81.x
- Routing: React Navigation

## Overview
Weather Dashboard is a real-time weather application built with React Native and Expo, featuring current weather conditions, 7-day forecasts, and location management with cross-platform compatibility.

## Quick Download
**Get the complete project instantly:**

[![Download WeatherDashboard](https://img.shields.io/badge/Download-WeatherDashboard.zip-blue?style=for-the-badge&logo=download)](https://github.com/hjoseph777/WeatherDashboard/releases/download/v1/WeatherDashboard.zip)

## Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://weather-dashboard-azure-pi.vercel.app/)

## Project Documentation
[![View Instructions](https://img.shields.io/badge/View-Instruction5.md-green?style=for-the-badge&logo=markdown&logoColor=white)](Instruction5.md)

*Detailed project requirements, team assignments, submission documentation*

## Most Important Files

| File | Description |
|------|-------------|
| [`App.js`](App.js) | Main application entry point and root component |
| [`package.json`](package.json) | Project dependencies and npm scripts configuration |
| [`vercel.json`](vercel.json) | Deployment configuration for Vercel platform |
| [`src/services/weatherAPI.js`](src/services/weatherAPI.js) | Weather API integration and data fetching logic |
| [`api/weather.js`](api/weather.js) | Serverless API endpoint for secure weather data |
| [`app.json`](app.json) | Expo configuration and app metadata |
| [`metro.config.js`](metro.config.js) | Metro bundler configuration for React Native |

## Features

- Real-time weather conditions and forecasts
- Multi-location management
- Interactive animations and responsive design
- Offline storage for preferences
- Cross-platform support (iOS/Android/Web)

## Tech Stack

- React Native 0.81.4
- Expo SDK 54.0.16
- React Navigation 7.1.18
- AsyncStorage 2.2.0
- WeatherAPI integration

## Quick Start

### Prerequisites
- Node.js v20.19.4+
- npm or yarn
- Expo CLI
- Expo Go app (for mobile testing)

### Installation

```bash
# Clone and install
git clone https://github.com/hjoseph777/WeatherDashboard.git
cd WeatherDashboard
npm install

# Start development
npm start
# Scan QR code with Expo Go app

# Alternative platforms
npm run web     # Web browser
npm run android # Android emulator
npm run ios     # iOS simulator (macOS only)
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # App screens (Home, Forecast, Settings)
├── navigation/     # Navigation configuration
├── services/       # API integration
└── utils/          # Constants and helpers
```

## API Configuration

The app uses WeatherAPI for weather data. For local development, update the API key in `src/services/weatherAPI.js` or use environment variables.

## Development Team

- **Developer 1:** Anupa Ragoonanan - API Integration & Data Management
- **Developer 2:** Harry Joseph - Interactive Components & User Experience
- **Developer 3:** Raj Patel - Modals, Notifications & Visual Design
- **Developer 4:** Kerlan Augustine - Navigation & Project Management

## Deployment

The app is deployed on Vercel with serverless API functions for secure weather data fetching. The production build supports web browsers while maintaining React Native mobile compatibility.

