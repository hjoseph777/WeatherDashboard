import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * WeatherCard Component - Developer 1: Display weather data
 * This component displays weather information in a card format
 */
const WeatherCard = ({ weatherData }) => {
  // show loading state if weather data is not available
  if (!weatherData) {
    console.log('No weather data available, showing loading state.');
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </View>
    );
  }

  // if there's an error in the weather data
  if (weatherData.error) {
    console.log('Error in weather data:', weatherData.error);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {weatherData.error || 'Failed to load weather data'}</Text>
      </View>
    );
  }

  // if weather data is available, display it
  const {data } = weatherData;
  console.log('Displaying weather data for:', data.city);

  // render weather information
  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <Text style={styles.title}>{data.city}, {data.country}</Text>
        <Text style={styles.subtitle}>{data.temperature}°C</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.feelsLike}>Feels like: {data.feelsLike}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 45,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
});

export default WeatherCard;