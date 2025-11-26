/*import React, { useState, useEffect } from 'react';
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

export default SavedLocationsScreen; */

import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput, Animated, PanResponder } from 'react-native';
import CustomButton from '../components/CustomButton';
import WeatherAPI from '../services/weatherAPI';
import Storage from '../services/storage';

const SavedLocationsScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newLocation, setNewLocation] = useState('');
    const [savedLocations, setSavedLocations] = useState([]);
    const [tomorrowForecasts, setTomorrowForecasts] = useState([]);
    const [error, setError] = useState(null);
    const [showTomorrow, setShowTomorrow] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    
    const swipeAnim = useRef(new Animated.Value(0)).current;
    const currentViewRef = useRef(null);

    // PanResponder for swipe gestures
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // respond if motion is a horizontal swipe
                const { dx, dy } = gestureState;
                return Math.abs(dx) > Math.abs(dy) * 2; // 2:1 horizontal vs vertical ratio
            },
            
            onPanResponderMove: (_, gestureState) => {
                const { dx } = gestureState;
                // Limit swipe to reasonable bounds
                const boundedDx = Math.max(Math.min(dx, 200), -200);
                swipeAnim.setValue(boundedDx);
            },
            
            onPanResponderRelease: (_, gestureState) => {
                const { dx, vx } = gestureState;
                const swipeThreshold = 50;
                const velocityThreshold = 0.5;

                // Swipe left to show tomorrow
                if ((dx < -swipeThreshold || vx < -velocityThreshold) && !showTomorrow) {
                    handleSwipeToTomorrow();
                }
                // Swipe right to show today
                else if ((dx > swipeThreshold || vx > velocityThreshold) && showTomorrow) {
                    handleSwipeToToday();
                }
                // Reset position
                else {
                    resetPosition();
                }
            },

            onPanResponderTerminate: () => {
                resetPosition();
            },

            onPanResponderTerminationRequest: () => true,
        })
    ).current;
    
    const handleSwipeToTomorrow = async () => {
        if (savedLocations.length === 0) return;

        try {
            setIsLoading(true);
            
            // fetch tomorrow's forecast for all locations
            const forecasts = await Promise.all(
            
                savedLocations.map(async (location) => {
                    try {
                        const forecastResult = await WeatherAPI.getForecast(location.city);
                        console.log('Forecast result for', location.city, forecastResult);

                
                        if (forecastResult.success && forecastResult.data && forecastResult.data.length > 1) {
                            const tomorrowData = forecastResult.data[1];
                            return {
                                ...location,
                                temperature: tomorrowData.temperature,
                                description: tomorrowData.description,
                            };
                        } else {
                            // if no forecast data, fall back to current data
                            return {
                            ...location,
                            };
                        }
                    } catch (error) {
                        console.error(`Error fetching forecast for ${location.city}:`, error);
                        
                        // Fall back to current data on error
                        return {
                            ...location,
                            date: 'Tomorrow'
                        };
                    }
                })
            );

            console.log('All forecasts completed:', forecasts);
            setTomorrowForecasts(forecasts);
        
            // animate tomorrow forecast
            Animated.timing(swipeAnim, {
                toValue: 300,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setShowTomorrow(true);
            });

        } catch (error) {
            console.error('Error in handleSwipeToTomorrow:', error);
            resetPosition();
        } finally {
            setIsLoading(false);
        }
    };
    
    // animate today's forecast
    const handleSwipeToToday = () => {
        Animated.timing(swipeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowTomorrow(false);
        });
    };

    const resetPosition = () => {
        Animated.spring(swipeAnim, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    // Load saved locations
    useEffect(() => {
        loadSavedLocations();
    }, []);

    const loadSavedLocations = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await Storage.getSavedLocations();

            if (result.success) {
                setSavedLocations(result.data);
                setLastUpdated(new Date());
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

    // Handle adding a new location
    const handleAddLocation = async () => {
        const locationName = newLocation.trim();

        if (!locationName) {
            Alert.alert('Error', 'Please enter a valid city name.');
            return;
        }

        if (savedLocations.some(loc => loc.city.toLowerCase() === locationName.toLowerCase())) {
            Alert.alert('Info', `${locationName} is already in your saved locations.`);
            return;
        }

        try {
            setIsLoading(true);
            const result = await WeatherAPI.getCurrentWeather(locationName);

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
                    await loadSavedLocations();
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

    // Handle removing a location
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

    // Refresh weather data
    const handleRefresh = async () => {
        try {
            setIsLoading(true);
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
            setLastUpdated(new Date());
            Alert.alert('Success', 'All weather data has been refreshed.');
        } catch (error) {
            console.error('Error refreshing all weather data:', error);
            Alert.alert('Error', 'Failed to refresh weather data.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderLocationCard = (location, isTomorrow = false) => (
        <View key={location.id} style={isTomorrow ? styles.tomorrowCityItem : styles.cityItem}>
            <View style={styles.locationInfo}>
                {isTomorrow && <Text style={styles.tomorrowBadge}>Tomorrow</Text>}
                <Text style={styles.cityText}>{location.city}, {location.country}</Text>
                <Text style={styles.weather}>{location.temperature}°C</Text>
                <Text style={styles.description}>{location.description}</Text>
                <Text style={styles.feelsLike}>Feels like: {location.feelsLike}°C</Text>
            </View>
            
            {!isTomorrow && (
                <CustomButton
                    title="Remove"
                    onPress={() => handleRemoveLocation(location.id)}
                    style={styles.removeButton}
                />
            )}
        </View>
    );

    // today forevast styling (position)
    const currentViewStyle = {
        transform: [{
            translateX: swipeAnim.interpolate({
                inputRange: [0, 300],
                outputRange: [0, -300],
                extrapolate: 'clamp'
            })
        }]
    };

    // tomorrow forecast styling (position)
    const tomorrowViewStyle = {
        transform: [{
            translateX: swipeAnim.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: [0, 400, 0,],
                extrapolate: 'clamp'
            })
        }]
    };

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <Text style={styles.title}>{showTomorrow ? 'Tomorow\'s Forecast' : 'Saved Locations'}</Text>

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
                loading={isLoading}
            />

            <Text style={styles.lastUpdated}>Last updated: {
                lastUpdated ? lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : 'Never'
            }</Text>

            <Text style={styles.swipeHint}>Swipe left for tomorrow's forecast</Text>

            <View style={styles.carouselContainer}>
                {/* Today's View */}
                <Animated.View 
                    style={[styles.forecastView, currentViewStyle]}
                    ref={currentViewRef}
                >
                    <ScrollView style={styles.locationsList}>
                        {savedLocations.length === 0 ? (
                            <Text style={styles.emptyText}>No saved locations. Add a city above!</Text>
                        ) : (
                            savedLocations.map(location => renderLocationCard(location, false))
                        )}
                    </ScrollView>
                </Animated.View>

                {/* Tomorrow's View */}
                <Animated.View style={[styles.forecastView, tomorrowViewStyle]}>
                <ScrollView style={styles.locationsList}>
                    {tomorrowForecasts.length === 0 ? (
                    // If no tomorrow data, show today's data with "Tomorrow" label
                    savedLocations.map(location => renderLocationCard({
                        ...location,
                        date: 'Tomorrow'
                    }, true))
                    ) : (
                    tomorrowForecasts.map(location => renderLocationCard(location, true))
                    )}
                </ScrollView>
                </Animated.View>
            </View>
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
        marginBottom: 10,
    },
    swipeHint: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
        marginBottom: 10,
        fontStyle: 'italic',
        width: '100%',
        textAlign: 'center',
    },
    carouselContainer: {
        flex: 1,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    forecastView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    cityItem: {
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: "#e7e7e7ff",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    locationInfo: {
        maxWidth: '65%',
    },
    cityText: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "bold",
        flexWrap: 'wrap'
    },
    tomorrowBadge: {
        fontSize: 14,
        color: '#0077b6',
        fontWeight: 'normal',
    },
    tomorrowCityItem: {
        marginBottom: 5,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: '#e5ebffff',
    },
    input: {
        borderWidth: .5,
        height: 40,
        textAlign: "center",
        width: 200,
    },
    addLocation: {
        flexDirection: "column",
        alignItems: "center",
    },
    weather: {
        color: "#666",
        fontSize: 25,
    },
    description: {
        color: "#888",
    },
    feelsLike: {
        color: "#888",
        fontSize: 12,
    },
    removeButton: {
        backgroundColor: "red",
    },
    locationsList: {
        width: '100%',
        paddingHorizontal: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 50,
        fontSize: 16,
    },
});

export default SavedLocationsScreen;