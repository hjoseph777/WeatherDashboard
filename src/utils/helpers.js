import { WEATHER_ICONS, ERROR_MESSAGES } from './constants';

/**
 * Helper Functions - Utility functions for the Weather Dashboard
 * All Developers: Shared utility functions
 */

/**
 * Format temperature with proper unit
 * @param {number} temp - Temperature value
 * @param {string} unit - Unit (metric, imperial, kelvin)
 * @returns {string} Formatted temperature
 */
export const formatTemperature = (temp, unit = 'metric') => {
  if (temp === null || temp === undefined) return '--°';
  
  const rounded = Math.round(temp);
  
  switch (unit) {
    case 'imperial':
      return `${rounded}°F`;
    case 'kelvin':
      return `${rounded}K`;
    default:
      return `${rounded}°C`;
  }
};

/**
 * Get emoji icon for weather condition
 * @param {string} iconCode - OpenWeatherMap icon code
 * @returns {string} Emoji representation
 */
export const getWeatherEmoji = (iconCode) => {
  return WEATHER_ICONS[iconCode] || '🌤️';
};

/**
 * Format date to readable string
 * @param {Date|string|number} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
    
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Format time to readable string
 * @param {Date|string|number} date - Date to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Time';
    }
    
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid Time';
  }
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate city name
 * @param {string} cityName - City name to validate
 * @returns {boolean} True if valid
 */
export const isValidCityName = (cityName) => {
  if (!cityName || typeof cityName !== 'string') return false;
  
  // Basic validation: at least 2 characters, letters and spaces only
  const regex = /^[a-zA-Z\s]{2,50}$/;
  return regex.test(cityName.trim());
};

/**
 * Calculate wind direction from degrees
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} Wind direction (N, NE, E, etc.)
 */
export const getWindDirection = (degrees) => {
  if (degrees === null || degrees === undefined) return 'N/A';
  
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                     'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Convert wind speed between units
 * @param {number} speed - Wind speed
 * @param {string} fromUnit - Source unit (m/s, mph, kph)
 * @param {string} toUnit - Target unit
 * @returns {number} Converted speed
 */
export const convertWindSpeed = (speed, fromUnit = 'm/s', toUnit = 'kph') => {
  if (speed === null || speed === undefined) return 0;
  
  // Convert to m/s first
  let mps = speed;
  if (fromUnit === 'mph') mps = speed * 0.44704;
  if (fromUnit === 'kph') mps = speed * 0.277778;
  
  // Convert from m/s to target unit
  if (toUnit === 'mph') return mps * 2.237;
  if (toUnit === 'kph') return mps * 3.6;
  return mps; // m/s
};

/**
 * Get error message for error code
 * @param {string} errorCode - Error code
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (errorCode) => {
  return ERROR_MESSAGES[errorCode] || 'An unexpected error occurred.';
};

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Check if location coordinates are valid
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {boolean} True if valid coordinates
 */
export const isValidCoordinates = (latitude, longitude) => {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 && latitude <= 90 &&
    longitude >= -180 && longitude <= 180
  );
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default {
  formatTemperature,
  getWeatherEmoji,
  formatDate,
  formatTime,
  capitalizeWords,
  generateId,
  isValidCityName,
  getWindDirection,
  convertWindSpeed,
  getErrorMessage,
  debounce,
  isValidCoordinates,
  calculateDistance,
};