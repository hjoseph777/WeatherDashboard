import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage Service - Developer 1: Data persistence
 * This service handles local data storage for saved locations and cached weather data
 */

class StorageService {
  // Storage keys
  static KEYS = {
    SAVED_LOCATIONS: 'weather_saved_locations',
    CACHED_WEATHER: 'weather_cached_data',
    USER_PREFERENCES: 'weather_user_preferences',
  };

  /**
   * Save locations to local storage
   * @param {Array} locations - Array of saved locations
   */
  static async saveSavedLocations(locations) {
    try {
      await AsyncStorage.setItem(
        this.KEYS.SAVED_LOCATIONS,
        JSON.stringify(locations)
      );
      return { success: true };
    } catch (error) {
      console.error('Error saving locations:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get saved locations from local storage
   * @returns {Promise<Array>} Array of saved locations
   */
  static async getSavedLocations() {
    try {
      const locations = await AsyncStorage.getItem(this.KEYS.SAVED_LOCATIONS);
      return {
        success: true,
        data: locations ? JSON.parse(locations) : []
      };
    } catch (error) {
      console.error('Error getting saved locations:', error);
      return { success: false, error: error.message, data: [] };
    }
  }

  /**
   * Add a new location to saved locations
   * @param {Object} location - Location object to save
   */
  static async addSavedLocation(location) {
    try {
      const { data: currentLocations } = await this.getSavedLocations();
      
      // Check if location already exists
      const exists = currentLocations.some(
        loc => loc.city.toLowerCase() === location.city.toLowerCase()
      );
      
      if (exists) {
        return { success: false, error: 'Location already saved' };
      }
      
      const updatedLocations = [...currentLocations, location];
      return await this.saveSavedLocations(updatedLocations);
    } catch (error) {
      console.error('Error adding location:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Remove a location from saved locations
   * @param {string} locationId - ID of location to remove
   */
  static async removeSavedLocation(locationId) {
    try {
      const { data: currentLocations } = await this.getSavedLocations();
      const updatedLocations = currentLocations.filter(
        loc => loc.id !== locationId
      );
      return await this.saveSavedLocations(updatedLocations);
    } catch (error) {
      console.error('Error removing location:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Cache weather data with timestamp
   * @param {string} city - City name
   * @param {Object} weatherData - Weather data to cache
   */
  static async cacheWeatherData(city, weatherData) {
    try {
      const cacheKey = `${this.KEYS.CACHED_WEATHER}_${city.toLowerCase()}`;
      const cacheData = {
        data: weatherData,
        timestamp: Date.now(),
        expiry: Date.now() + (30 * 60 * 1000) // 30 minutes
      };
      
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData));
      return { success: true };
    } catch (error) {
      console.error('Error caching weather data:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get cached weather data if still valid
   * @param {string} city - City name
   * @returns {Promise<Object>} Cached weather data or null
   */
  static async getCachedWeatherData(city) {
    try {
      const cacheKey = `${this.KEYS.CACHED_WEATHER}_${city.toLowerCase()}`;
      const cachedData = await AsyncStorage.getItem(cacheKey);
      
      if (!cachedData) {
        return { success: true, data: null };
      }
      
      const { data, expiry } = JSON.parse(cachedData);
      
      // Check if cache is still valid
      if (Date.now() > expiry) {
        await AsyncStorage.removeItem(cacheKey);
        return { success: true, data: null };
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error getting cached weather data:', error);
      return { success: false, error: error.message, data: null };
    }
  }

  /**
   * Clear all cached data
   */
  static async clearCache() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => 
        key.startsWith(this.KEYS.CACHED_WEATHER)
      );
      
      await AsyncStorage.multiRemove(cacheKeys);
      return { success: true };
    } catch (error) {
      console.error('Error clearing cache:', error);
      return { success: false, error: error.message };
    }
  }
}

export default StorageService;

// Usage examples:
// await StorageService.saveSavedLocations(locations);
// const { data: locations } = await StorageService.getSavedLocations();
// await StorageService.cacheWeatherData('Toronto', weatherData);