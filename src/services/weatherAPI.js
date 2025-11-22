/**
 * Weather API Service - Developer 1: API Integration & Progress Management
 * This service handles all weather data fetching from OpenWeatherMap API
 */

// TODO: Replace with your weather API key
const API_KEY = '8f3ba7286afd4c79a82184238252810';
const BASE_URL = 'http://api.weatherapi.com/v1';

class WeatherAPI {
  /**
   * Get current weather data for a city
   * @param {string} city - City name
   * @returns {Promise<Object>} Weather data
   */
  static async getCurrentWeather(city) {
    try {
      // get current city
      console.log('Fetching weather for city:', city);

      // if unable to fetch from API
      if (!API_KEY) {
        throw new Error('API key is missing. Please check API key.');
      }

      // get encoded city name for URL
      const encodedCity = encodeURIComponent(city);
      
      // url to fetch weather data
      const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;
      console.log('Fetching weather data from URL:', url);

      // fetching data from API status
      const response = await fetch(url);
      console.log('API response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // parse JSON data
      const data = await response.json();
      
      return {
        success: true,
        data: {
          city: data.location.name, // get city name from data
          country: data.location.country, // get country name from data
          temperature: Math.round(data.current.temp_c), // get temperature in Celsius
          description: data.current.condition.text, // get weather description
          humidity: data.current.humidity, // get humidity percentage
          windSpeed: data.current.wind_kph, // get wind speed in kph
          icon: data.current.condition.icon, // get weather icon URL
          feelsLike: Math.round(data.current.feelslike_c), // get feels like temperature
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
   * Get 3-day weather forecast for a city
   * @param {string} city - City name
   * @returns {Promise<Object>} Forecast data
   */
  static async getForecast(city, days = 5) {
    try {
      // get forecast for city
      console.log('Fetching forecast for city:', city);

      // if unable to fetch from API
      if (!API_KEY) {
        throw new Error('API key is missing. Please check API key.');
      }

      // get encoded city name for URL
      const encodedCity = encodeURIComponent(city);
      const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;
      
      console.log('Fetching forecast data from URL:', url);

      // fetching data from API status
      const response = await fetch(url);
      console.log('API response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // parse JSON data
      const data = await response.json();
      console.log('Forecast data received:', data.forecast?.forecastday?.length);

      // Process forecast data (one entry per day)
      const dailyForecast = data.forecast.forecastday;
      
      return {
        success: true,
        data: dailyForecast.map(day => ({
          date: day.date,
          temperature: Math.round(day.day.avgtemp_c),
          humidity: day.day.avghumidity,
          windSpeed: Math.round(day.day.maxwind_kph),
          description: day.day.condition.text,
          icon: day.day.condition.icon,
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

  // add location to saved list
  static async addLocation(city) {
    return await this.getCurrentWeather(city);
    console.log('Adding location:', city);
  }

  // remove location from saved list
  static async removeLocation(city) {
    return
  }
}

export default WeatherAPI;
