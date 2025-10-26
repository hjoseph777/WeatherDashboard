/**
 * Constants - Shared constants for the Weather Dashboard
 * All Developers: Shared constants and configuration
 */

// API Configuration
export const API_CONFIG = {
  OPENWEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: 'YOUR_API_KEY_HERE', // TODO: Developer 1 - Add your API key
  DEFAULT_UNITS: 'metric', // metric, imperial, kelvin
  CACHE_DURATION: 30 * 60 * 1000, // 30 minutes in milliseconds
};

// Developer Color Coding (matching ProjectTask.md)
export const DEVELOPER_COLORS = {
  DEVELOPER_1: '#ff6b6b', // Red/Coral - API Integration & Progress Management
  DEVELOPER_2: '#4a6361ff', // Teal/Turquoise - Interactive Components & Gestures
  DEVELOPER_3: '#45b7d1', // Blue - Modals, Notifications & Animations
  DEVELOPER_4: '#f7b731', // Orange/Gold - Navigation & Project Documentation
};

// App Theme Colors
export const COLORS = {
  PRIMARY: '#45b7d1',
  SECONDARY: '#4ecdc4',
  ACCENT: '#f7b731',
  ERROR: '#ff6b6b',
  SUCCESS: '#2ecc71',
  WARNING: '#f39c12',
  
  // Background colors
  BACKGROUND: '#f5f5f5',
  CARD_BACKGROUND: '#ffffff',
  
  // Text colors
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666',
  TEXT_LIGHT: '#888888',
  TEXT_WHITE: '#ffffff',
  
  // Weather themed colors
  SUNNY: '#f39c12',
  CLOUDY: '#95a5a6',
  RAINY: '#3498db',
  SNOWY: '#ecf0f1',
};

// Typography
export const FONTS = {
  SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    XLARGE: 24,
    TITLE: 28,
  },
  WEIGHTS: {
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    BOLD: '700',
  },
};

// Spacing (8px grid system)
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 40,
};

// Animation Durations
export const ANIMATIONS = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
  SPRING: {
    TENSION: 100,
    FRICTION: 8,
  },
};

// Weather Icon Mappings (OpenWeatherMap icon codes)
export const WEATHER_ICONS = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️', // scattered clouds
  '04d': '☁️', // broken clouds
  '04n': '☁️', // broken clouds
  '09d': '🌧️', // shower rain
  '09n': '🌧️', // shower rain
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️', // thunderstorm
  '13d': '❄️', // snow
  '13n': '❄️', // snow
  '50d': '🌫️', // mist
  '50n': '🌫️', // mist
};

// Screen Dimensions Helper
export const SCREEN = {
  // Will be set dynamically in App.js
  WIDTH: null,
  HEIGHT: null,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  API_ERROR: 'Failed to fetch weather data. Please try again.',
  LOCATION_NOT_FOUND: 'Location not found. Please check the spelling.',
  CACHE_ERROR: 'Failed to save data locally.',
  PERMISSION_DENIED: 'Location permission denied.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOCATION_SAVED: 'Location saved successfully!',
  LOCATION_REMOVED: 'Location removed successfully!',
  DATA_REFRESHED: 'Weather data updated!',
};

export default {
  API_CONFIG,
  DEVELOPER_COLORS,
  COLORS,
  FONTS,
  SPACING,
  ANIMATIONS,
  WEATHER_ICONS,
  SCREEN,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};