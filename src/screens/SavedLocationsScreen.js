import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import WeatherAPI from '../services/weatherAPI';
import Storage from '../services/storage';


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
        const locationName = newLocation.trim();

        if (!locationName) {
            Alert.alert('Error', 'Please enter a valid city name.');
            return;
        }

        // check if already saved
        if (savedLocations.some(loc => loc.city.toLowerCase() === locationName.toLowerCase())) {
            Alert.alert('Info', `${locationName} is already in your saved locations.`);
            return;
        }

        try {
            setIsLoading(true);

            const result = await WeatherAPI.getCurrentWeather(locationName);
            console.log('Weather API result:', result);

            if (result.success) {
                const newLocationData = {
                    id: Date.now().toString(),
                    city: result.data.city,
                    country: result.data.country,
                    temperature: result.data.temperature,
                    feelsLike: result.data.feelsLike,
                    description: result.data.description,
                    icon: result.data.icon,
                };

                const updateLocations = await Storage.addSavedLocation(newLocationData);

                if (updateLocations.success) {
                    await loadSavedLocations(); // reload list after adding
                    setNewLocation('');
                    Alert.alert('Success', `${locationName} has been added to your saved locations.`);
                } else {
                    Alert.alert('Error', result.error || 'Failed to add location.');
                }
            } else {
                Alert.alert('Error', result.error || 'Failed to fetch city.');
            }
        } catch (error) {
            console.error('Error adding location:', error);
            Alert.alert('Error', error.message || 'Failed to add location.');
        } finally {
            setIsLoading(false);
        }
    };

    // handle removing a location
    const handleRemoveLocation = async (locationId) => {
        Alert.alert(
            "Remove Location",
            "Are you sure you want to delete this location?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            const result = await Storage.removeSavedLocation(locationId);
                            if (result.success) {
                                const refreshed = await Storage.getSavedLocations();
                                if (refreshed.success) setSavedLocations(refreshed.data);
                                Alert.alert("Success", "Location removed.");
                            } else {
                                Alert.alert("Error", result.error || "Failed to remove location.");
                            }
                        } catch (error) {
                            console.error("Error removing location:", error);
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ]
        );
    };

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
                            return {
                                ...location,
                                temperature: weatherResult.data.temperature,
                                feelsLike: weatherResult.data.feelsLike,
                                description: weatherResult.data.description,
                                country: weatherResult.data.country
                            };
                        } else {
                            return location;
                        }
                    } catch (error) {
                        console.error(`Error refreshing weather for ${location.city}:`, error);
                        return location;
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
                            </View>
                            <CustomButton
                                title="Remove"
                                onPress={() => handleRemoveLocation(location.id)}
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