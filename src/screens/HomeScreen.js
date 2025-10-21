import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import WeatherCard from '../components/WeatherCard';
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';
import AnimatedIcon from '../components/AnimatedIcon';

/**
 * HomeScreen - Current weather display
 * Developer 4: Navigation & Project Documentation
 */
const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Weather Dashboard</Text>
        <Text style={styles.subtitle}>Developer 4: Navigation & Project Documentation</Text>
        
        <AnimatedIcon iconName="🌤️" animationType="bounce" />
        
        <WeatherCard />
        
        <CustomButton 
          title="Refresh Weather" 
          onPress={handleRefresh}
        />
        
        <CustomButton 
          title="View Forecast" 
          onPress={() => navigation.navigate('Forecast')}
          style={{ backgroundColor: '#45b7d1' }}
        />
        
        <CustomButton 
          title="Saved Locations" 
          onPress={() => navigation.navigate('SavedLocations')}
          style={{ backgroundColor: '#f7b731' }}
        />
      </ScrollView>
      
      <LoadingSpinner visible={isLoading} text="Fetching weather data..." />
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
});

export default HomeScreen;