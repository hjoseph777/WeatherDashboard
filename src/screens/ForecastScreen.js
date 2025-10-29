import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AnimatedIcon from '../components/AnimatedIcon';
import WeatherAPI from '../services/weatherAPI';

// 5 day forecast
const ForecastScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  // get city from route params or default to Toronto
  const city = route?.params?.city || 'Toronto';

  // load weather data 
  useEffect(() => {
    loadForecastData();
  }, [city]);

  const loadForecastData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Loading forecast data for:', city);

      // get Forecast data from API
      const result = await WeatherAPI.getForecast(city);
      console.log('Weather API result:', result);

      if (result.success) {
        setForecastData(result.data);
      } else {
        setError(result.error || 'Failed to load forecast data');
      }
    } catch (error) {
      console.error('Error loading forecast data:', error);
      setError(error.message || 'Failed to load forecast data');
    } finally {
      setIsLoading(false);
    }
  };

  // format forecast data for display
  const formatDay = (dateString, index) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // calculate tomorrow's date

    // check if date is today or tomorrow
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    // check if date is tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    // otherwise return day of week
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // handle loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading forecast...</Text>
      </View>
    );
  }

  // handle error state
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>5-Day Forecast for {city}</Text>
        
          {forecastData ? ( forecastData.slice(0, 5).map((item, index) => (
            <View key={index} style={styles.forecastItem}>
              <View style={styles.forecastInfo}>
                <Text style={styles.day}>{formatDay(item.date, index)}</Text>
                <Text style={styles.temp}>{item.temperature}°C</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.details}>💧 {item.humidity}%</Text>
                <Text style={styles.details}>💨 {item.windSpeed} km/h</Text>
              </View>
            </View>
        ))) : (
          <Text>No forecast data available</Text>
        )}
        {/*<CustomButton
          title="Refresh"
          onPress={() => handleRefreshLocation(location.city)}
          style={styles.refreshButton}
        />*/}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  forecastItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  forecastInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  day: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  temp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#45b7d1',
  },
  note: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default ForecastScreen;