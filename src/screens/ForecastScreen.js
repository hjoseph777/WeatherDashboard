import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AnimatedIcon from '../components/AnimatedIcon';

/**
 * ForecastScreen - 5-day forecast display
 * Developer 4: Navigation & Project Documentation
 */
const ForecastScreen = ({ navigation }) => {
  // Mock forecast data
  const forecastDays = [
    { day: 'Today', temp: '22°C', icon: '☀️' },
    { day: 'Tomorrow', temp: '19°C', icon: '⛅' },
    { day: 'Wednesday', temp: '16°C', icon: '🌧️' },
    { day: 'Thursday', temp: '18°C', icon: '⛅' },
    { day: 'Friday', temp: '21°C', icon: '☀️' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>5-Day Forecast</Text>
        <Text style={styles.subtitle}>Developer 4: Navigation & Project Documentation</Text>
        
        {forecastDays.map((item, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.day}>{item.day}</Text>
            <AnimatedIcon iconName={item.icon} animationType="fade" />
            <Text style={styles.temp}>{item.temp}</Text>
          </View>
        ))}
        
        <Text style={styles.note}>
          TODO: Connect to weatherAPI.js service for real forecast data
        </Text>
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
    flexDirection: 'row',
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