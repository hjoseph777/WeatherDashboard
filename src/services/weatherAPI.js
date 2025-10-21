/**
 * Weather API Service - Developer 1: API Integration & Progress Management
 * This service handles all weather data fetching from OpenWeatherMap API
 */

// TODO: Replace with your actual API key from OpenWeatherMap
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherAPI {
  /**
   * Get current weather data for a city
   * @param {string} city - City name
   * @returns {Promise<Object>} Weather data
   */
  static async getCurrentWeather(city) {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: {
          city: data.name,
          country: data.sys.country,
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
        }
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get 5-day weather forecast for a city
   * @param {string} city - City name
   * @returns {Promise<Object>} Forecast data
   */
  static async getForecast(city) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process forecast data (one entry per day)
      const dailyForecast = data.list.filter((item, index) => index % 8 === 0);
      
      return {
        success: true,
        data: dailyForecast.map(item => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }))
      };
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Mock data for testing (use when API key is not available)
   * @param {string} city - City name
   * @returns {Object} Mock weather data
   */
  static getMockCurrentWeather(city) {
    return {
      success: true,
      data: {
        city: city,
        country: 'Test',
        temperature: 22,
        description: 'Partly cloudy',
        humidity: 65,
        windSpeed: 5.2,
        icon: '02d',
      }
    };
  }

  /**
   * Mock forecast data for testing
   * @param {string} city - City name
   * @returns {Object} Mock forecast data
   */
  static getMockForecast(city) {
    return {
      success: true,
      data: [
        { date: 'Today', temperature: 22, description: 'Sunny', icon: '01d' },
        { date: 'Tomorrow', temperature: 19, description: 'Cloudy', icon: '02d' },
        { date: 'Wed', temperature: 16, description: 'Rainy', icon: '09d' },
        { date: 'Thu', temperature: 18, description: 'Partly cloudy', icon: '02d' },
        { date: 'Fri', temperature: 21, description: 'Sunny', icon: '01d' },
      ]
    };
  }
}

export default WeatherAPI;

// Usage examples:
// const weather = await WeatherAPI.getCurrentWeather('Toronto');
// const forecast = await WeatherAPI.getForecast('Toronto');