import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

/**
 * SavedLocationsScreen - Favorite locations list
 * Developer 4: Navigation & Project Documentation
 */
const SavedLocationsScreen = ({ navigation }) => {
  const [savedLocations, setSavedLocations] = useState([
    { id: 1, city: 'Toronto', country: 'Canada', temp: '15°C' },
    { id: 2, city: 'New York', country: 'USA', temp: '18°C' },
    { id: 3, city: 'London', country: 'UK', temp: '12°C' },
  ]);

  const handleAddLocation = () => {
    // TODO: Developer 3 - Implement modal for adding new location
    Alert.alert(
      'Add Location',
      'This will open a modal to add new location (Developer 3 task)',
      [{ text: 'OK' }]
    );
  };

  const handleRemoveLocation = (locationId) => {
    // TODO: Developer 3 - Implement confirmation modal
    Alert.alert(
      'Remove Location',
      'Are you sure you want to remove this location?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setSavedLocations(prev => 
              prev.filter(location => location.id !== locationId)
            );
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Saved Locations</Text>
        <Text style={styles.subtitle}>Developer 4: Navigation & Project Documentation</Text>
        
        {savedLocations.map((location) => (
          <View key={location.id} style={styles.locationItem}>
            <View style={styles.locationInfo}>
              <Text style={styles.cityName}>{location.city}</Text>
              <Text style={styles.country}>{location.country}</Text>
            </View>
            <Text style={styles.temperature}>{location.temp}</Text>
            <CustomButton
              title="Remove"
              onPress={() => handleRemoveLocation(location.id)}
              style={[styles.removeButton, { backgroundColor: '#ff6b6b' }]}
            />
          </View>
        ))}
        
        <CustomButton
          title="Add New Location"
          onPress={handleAddLocation}
          style={{ backgroundColor: '#4ecdc4', marginTop: 20 }}
        />
        
        <Text style={styles.note}>
          TODO: Connect to storage.js service for persistence
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
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  locationInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  country: {
    fontSize: 14,
    color: '#666',
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#45b7d1',
    marginRight: 10,
  },
  removeButton: {
    minWidth: 80,
  },
  note: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default SavedLocationsScreen;