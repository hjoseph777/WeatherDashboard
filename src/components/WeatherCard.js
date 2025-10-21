import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * WeatherCard Component - Developer 1: Display weather data
 * This component displays weather information in a card format
 */
const WeatherCard = ({ weatherData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Card Component</Text>
      <Text style={styles.subtitle}>Developer 1: API Integration & Progress Management</Text>
      <Text style={styles.description}>
        This component will display weather data from the API
      </Text>
      {/* TODO: Implement weather data display */}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
});

export default WeatherCard;