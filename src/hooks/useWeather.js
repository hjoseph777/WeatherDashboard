import { useState, useEffect } from 'react';
import WeatherAPI from '../services/weatherAPI';
import StorageService from '../services/storage';

/**
 * Custom Hook: useWeather - Weather data management
 * Developer 1: API Integration & Progress Management
 * This hook manages weather data fetching and caching
 */

const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);

  // Load saved locations on component mount
  useEffect(() => {
    loadSavedLocations();
  }, []);

  /**
   * Load saved locations from storage
   */
  const loadSavedLocations = async () => {
    try {
      const { data, success } = await StorageService.getSavedLocations();
      if (success) {
        setSavedLocations(data);
      }
    } catch (err) {
      console.error('Error loading saved locations:', err);
    }
  };

  /**
   * Fetch current weather for a city
   * @param {string} city - City name
   */
  const fetchCurrentWeather = async (city) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check cache first
      const cachedData = await StorageService.getCachedWeatherData(city);
      if (cachedData.success && cachedData.data) {
        setCurrentWeather(cachedData.data);
        setIsLoading(false);
        return;
      }

      // Fetch from API
      const result = await WeatherAPI.getCurrentWeather(city);
      
      if (result.success) {
        setCurrentWeather(result.data);
        // Cache the data
        await StorageService.cacheWeatherData(city, result.data);
      } else {
        setError(result.error);
        // Fallback to mock data for demonstration
        const mockData = WeatherAPI.getMockCurrentWeather(city);
        setCurrentWeather(mockData.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch weather forecast for a city
   * @param {string} city - City name
   */
  const fetchForecast = async (city) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await WeatherAPI.getForecast(city);
      
      if (result.success) {
        setForecast(result.data);
      } else {
        setError(result.error);
        // Fallback to mock data for demonstration
        const mockData = WeatherAPI.getMockForecast(city);
        setForecast(mockData.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a location to saved locations
   * @param {Object} location - Location object
   */
  const addSavedLocation = async (location) => {
    try {
      const result = await StorageService.addSavedLocation(location);
      if (result.success) {
        await loadSavedLocations(); // Refresh the list
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /**
   * Remove a location from saved locations
   * @param {string} locationId - Location ID
   */
  const removeSavedLocation = async (locationId) => {
    try {
      const result = await StorageService.removeSavedLocation(locationId);
      if (result.success) {
        await loadSavedLocations(); // Refresh the list
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /**
   * Refresh weather data (force fetch from API)
   * @param {string} city - City name
   */
  const refreshWeatherData = async (city) => {
    // Clear cache for this city first
    try {
      await StorageService.clearCache();
    } catch (err) {
      console.error('Error clearing cache:', err);
    }
    
    // Fetch fresh data
    await fetchCurrentWeather(city);
    await fetchForecast(city);
  };

  /**
   * Clear all data and reset state
   */
  const clearWeatherData = () => {
    setCurrentWeather(null);
    setForecast([]);
    setError(null);
  };

  return {
    // State
    currentWeather,
    forecast,
    isLoading,
    error,
    savedLocations,
    
    // Actions
    fetchCurrentWeather,
    fetchForecast,
    addSavedLocation,
    removeSavedLocation,
    refreshWeatherData,
    clearWeatherData,
    loadSavedLocations,
  };
};

export default useWeather;