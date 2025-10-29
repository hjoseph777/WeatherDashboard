import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import WeatherAPI from '../services/weatherAPI';
import Storage from '../services/storage';
//import { timeStamp } from 'node:console';

/**
* SavedLocationsScreen - Favorite locations list
*/

const SavedLocationsScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newLocation, setNewLocation] = useState('');
    const [savedLocations, setSavedLocations] = useState([]);
    const [error, setError] = useState(null);

    // load saved locations
    useEffect(() => {
        loadSavedLocations();
    }, []);
    
    const loadSavedLocations = async () => {
        try {
            setIsLoading(true);
            setError(null);
            console.log('Loading saved locations...');

            // get saved locations from storage
            const result = await Storage.getSavedLocations();
            console.log('Saved locations:', result);
            
            if (result.success) {
                setSavedLocations(result.data);
            } else {
                setError(result.error || 'Failed to load saved locations');
            }
        } catch (error) {
            console.error('Error loading saved locations:', error);
            setError(error.message || 'Failed to load saved locations');
        } finally {
            setIsLoading(false);
        }
    };
    
    // handle adding a new location
    const handleAddLocation = async () => {
    
        // check for location name
        if (!newLocation.trim()) {
            Alert.alert('Error', 'Please enter a valid city name.');
            return;
        }

        try {
            setIsLoading(true);

            // verify the city exists in the API
            const result = await WeatherAPI.getCurrentWeather(newLocation.trim());
            console.log('Weather API result:', result);

            // check if location already exists
            if (savedLocations.some(loc => loc.city.toLowerCase() === locationName.toLowerCase())) {
                Alert.alert('Info', `${locationName} is already in your saved locations.`);
                return;
            }

            // create the new weather location
            if (result.success) {
                const locationName = newLocation.trim();
            
                // create weather data for new location using the API response
                const newLocationData = {
                    id: Date.now().toString(), // unique ID for the location
                    city: result.data.city,
                    country: result.data.country,
                    temperature: result.data.temperature,
                    feelsLike: result.data.feelsLike,
                    description: result.data.description,
                    humidity: result.data.humidity,
                    windSpeed: result.data.windSpeed,
                    icon: result.data.icon,
                };

                // save to storage
                const updateLocations = await Storage.addSavedLocation(newLocationData);

                if (updateLocations.success) {
                    await loadSavedLocations();
                    setNewLocation('');
                    Alert.alert('Success', `${locationName} has been added to your saved locations.`);
                } else {
                    Alert.alert('Error', result.error || 'Failed to add location. City may not exist.');
                }
            }
        } catch (error) {
            console.error('Error adding location:', error);
            Alert.alert('Error', error.message || 'Failed to add location.');
        } finally {
            setIsLoading(false);
        }
    }
    
    // handle removing a location
    const handleRemoveLocation = async (city) => {
        Alert.alert(
            "Remove Location",
            `Are you sure you want to delete ${city}?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove",
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            console.log(`${city} removed!`);

                            // reload saved locations
                            await loadSavedLocations();
                        } catch (error) {
                            console.erre('Error removing location', error);
                        } finally {
                            setIsLoading(false);
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    /*/ handle refreshing location weather data
    const handleRefreshLocation = async (city) => {
        try {
            setIsLoading(true);
            const result = await WeatherAPI.getCurrentWeather(city);
            
            if (result.success) {
                const updateLocations = savedLocations.map(location => 
                    location.city === city 
                        ? {
                            ...location,
                            temperature: result.data.temperature,
                            feelsLike: result.data.feelsLike,
                            description: result.data.description,
                            country: result.data.country
                        }
                        : location
                );
                setSavedLocations(updatedLocations);
                Alert.alert('Success', `Weather data for ${city} has been updated.`);
            } else {
                Alert.alert('Error', `Failed to update weather data for ${city}.`);
            }
        } catch (error) {
            console.error('Error refreshing location:', error);
            Alert.alert('Error', 'Failed to refresh weather data.');
        } finally {
            setIsLoading(false);
        }
    };*/

    // refresh weather data
    const handleRefresh = async () => {
        try {
            setIsLoading(true);
            console.log('Refreshing all weather data...');

            const updatedLocations = await Promise.all(
                savedLocations.map(async (location) => {
                    try {
                        const weatherResult = await WeatherAPI.getCurrentWeather(location.city);
                        
                        if (weatherResult.success) {
                            // Update cache with new data
                            await StorageService.cacheWeatherData(location.city, {
                                temperature: weatherResult.data.temperature,
                                feelsLike: weatherResult.data.feelsLike,
                                description: weatherResult.data.description,
                                humidity: weatherResult.data.humidity,
                                windSpeed: weatherResult.data.windSpeed,
                                icon: weatherResult.data.icon
                            });
                            
                            return {
                                ...location,
                                temperature: weatherResult.data.temperature,
                                feelsLike: weatherResult.data.feelsLike,
                                description: weatherResult.data.description,
                                humidity: weatherResult.data.humidity,
                                windSpeed: weatherResult.data.windSpeed,
                                icon: weatherResult.data.icon,
                                error: null
                            };
                        } else {
                            console.warn(`Failed to refresh weather for ${location.city}:`, weatherResult.error);
                            return {
                                ...location,
                                error: weatherResult.error
                            };
                        }
                    } catch (error) {
                        console.error(`Error refreshing weather for ${location.city}:`, error);
                        return {
                            ...location,
                            error: error.message
                        };
                    }
                })
            );

            setSavedLocations(updatedLocations);
            
            Alert.alert('Success', 'All weather data has been refreshed.');
        } catch (error) {
            console.error('Error refreshing all weather data:', error);
            Alert.alert('Error', 'Failed to refresh weather data.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Locations</Text>

            <View style={styles.addLocation}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter city name"
                    value={newLocation}
                    onChangeText={setNewLocation}
                />
                <CustomButton 
                    title="Add Location" 
                    onPress={handleAddLocation} 
                    loading={isLoading}
                    style={{ marginTop: 10, backgroundColor: '#0077b6' }}
                />
            </View>

            <CustomButton 
            title="Refresh Weather" 
            onPress={handleRefresh}
            />

            <ScrollView style={styles.locationsList}>
                {savedLocations.length === 0 ? (
                    <Text style={styles.emptyText}>No saved locations. Add a city above!</Text>
                ) : (
                    savedLocations.map((location, index) => (
                        <View key={index} style={styles.cityItem}>
                            <View style={styles.locationInfo}>
                                <Text style={styles.cityText}>{location.city}, {location.country}</Text>
                                <Text style={styles.weather}>{location.temperature}°C</Text>
                                <Text style={styles.description}>{location.description}</Text>
                                <Text style={styles.feelsLike}>Feels like: {location.feelsLike}°C</Text>
                                <Text style={styles.lastUpdated}>{location.lastUpdated}</Text>
                            </View>
                            <CustomButton
                                title="Remove"
                                onPress={() => handleRemoveLocation(location.city)}
                                style={styles.removeButton}
                            />
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    cityItem: {
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: "#e7e7e7ff",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
    },
    cityText: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "bold",
    },
    input: {
        borderWidth: .5,
        height: 40,
        textAlign: "center",
    },
    addLocation: {
        flexDirection: "row",
        alignItems: "center",
    },
    weather: {
        color: "#666",
        fontSize: 25,
    },
    description: {
        color: "#888",
    },
    removeButton: {
        backgroundColor: "red",
        marginLeft: 50,
    },
});

export default SavedLocationsScreen;