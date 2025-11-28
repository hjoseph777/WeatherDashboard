import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput, Animated, PanResponder, Dimensions } from 'react-native';
import CustomButton from '../components/CustomButton';
import WeatherAPI from '../services/weatherAPI';
import Storage from '../services/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIEW_WIDTH = SCREEN_WIDTH;

const SavedLocationsScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newLocation, setNewLocation] = useState('');
    const [savedLocations, setSavedLocations] = useState([]);
    const [tomorrowForecasts, setTomorrowForecasts] = useState([]);
    const [error, setError] = useState(null);
    const [showTomorrow, setShowTomorrow] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    
    const position = useRef(new Animated.Value(0)).current; 
    const pan = useRef(new Animated.Value(0)).current; 

    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                const { dx, dy } = gestureState;
                return Math.abs(dx) > Math.abs(dy) * 2;
            },
            
            onPanResponderGrant: () => {
                translateX.stopAnimation();
            },
            
            onPanResponderMove: (_, gestureState) => {
                // control the translation based on gesture
                const newX = showTomorrow ? (-VIEW_WIDTH + gestureState.dx) : gestureState.dx;
                translateX.setValue(newX);
            },
            
            onPanResponderRelease: (_, gestureState) => {
                const { dx, vx } = gestureState;
                const swipeThreshold = VIEW_WIDTH * 0.2;
                
                let targetValue = 0;
                
                if (showTomorrow) {
                    // swipe right to go back to today
                    targetValue = (dx > swipeThreshold || vx > 0.3) ? 0 : -VIEW_WIDTH;
                } else {
                    // Swipe left to go to tomorrow
                    targetValue = (dx < -swipeThreshold || vx < -0.3) ? -VIEW_WIDTH : 0;
                }

                // update state instantly based on target value
                const shouldBeShowingTomorrow = targetValue !== 0;
                setShowTomorrow(shouldBeShowingTomorrow);

                Animated.spring(translateX, {
                    toValue: targetValue,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 7,
                }).start(() => {
                    if (shouldBeShowingTomorrow && tomorrowForecasts.length === 0) {
                        fetchTomorrowForecasts();
                    }
                });
            },
            
            onPanResponderTerminate: () => {
                // snap back to current state if gesture is interrupted
                const targetValue = showTomorrow ? -VIEW_WIDTH : 0;
                Animated.spring(translateX, {
                    toValue: targetValue,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 7,
                }).start();
            },
            
            onPanResponderTerminationRequest: () => true,
        })
    ).current;

    const fetchTomorrowForecasts = async () => {
        if (savedLocations.length === 0) return;

        try {
            setIsLoading(true); 
            const forecasts = await Promise.all(
                savedLocations.map(async (location) => {
                    try {
                        const forecastResult = await WeatherAPI.getForecast(location.city);
                        if (forecastResult.success && forecastResult.data && forecastResult.data.length > 1) {
                            const tomorrowData = forecastResult.data[1];
                            return {
                                ...location,
                                temperature: tomorrowData.temperature,
                                description: tomorrowData.description,
                                feelsLike: tomorrowData.feelsLike || 'N/A', 
                            };
                        } else {
                            return { ...location, date: 'Tomorrow' };
                        }
                    } catch (error) {
                        console.error(`Error fetching forecast for ${location.city}:`, error);
                        return { ...location, date: 'Tomorrow' };
                    }
                })
            );

            setTomorrowForecasts(forecasts);
        } catch (error) {
            console.error('Error in fetchTomorrowForecasts:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
            setTomorrowForecasts([]); 
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
            <View style={[styles.locationInfo, !isTomorrow && {flex: 1}]}>
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

    const currentViewStyle = {
        transform: [{ translateX }]
    };

    const tomorrowViewStyle = {
        transform: [{ translateX: Animated.add(translateX, VIEW_WIDTH) }]
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{showTomorrow ? 'Tomorrow\'s Forecast' : 'Saved Locations'}</Text>

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

            <Text style={styles.swipeHint}>{showTomorrow ? 'Swipe right for today\'s forecast' : 'Swipe left for tomorrow\'s forecast'}</Text>
            
            <View style={styles.carouselContainer} {...panResponder.panHandlers}>
                
                <Animated.View 
                    style={[styles.forecastView, currentViewStyle]}
                >
                    <ScrollView contentContainerStyle={styles.locationsListContent}>
                        {savedLocations.length === 0 ? (
                            <Text style={styles.emptyText}>No saved locations. Add a city above!</Text>
                        ) : (
                            savedLocations.map(location => renderLocationCard(location, false))
                        )}
                    </ScrollView>
                </Animated.View>

                <Animated.View style={[styles.forecastView, tomorrowViewStyle]}>
                    <ScrollView contentContainerStyle={styles.locationsListContent}>
                        {(showTomorrow && tomorrowForecasts.length > 0) ? (
                            tomorrowForecasts.map(location => renderLocationCard(location, true))
                        ) : (
                            savedLocations.map(location => renderLocationCard(location, true))
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
        justifyContent: "flex-start",
        backgroundColor: "#f9f9f9",
        paddingTop: 40,
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
        width: VIEW_WIDTH, 
        bottom: 0,
        paddingHorizontal: 10, 
    },
    cityItem: {
        marginBottom: 15,
        alignItems: "center",
        backgroundColor: "#e7e7e7ff",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        minHeight: 120,
    },
    locationInfo: {
        maxWidth: '65%',
    },
    cityText: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
        flexWrap: 'wrap'
    },
    tomorrowBadge: {
        fontSize: 14,
        color: '#0077b6',
        fontWeight: 'normal',
    },
    tomorrowCityItem: {
        marginBottom: 15,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: '#e5ebffff',
        minHeight: 120,
    },
    input: {
        borderWidth: .5,
        height: 40,
        textAlign: "center",
        width: 200,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    addLocation: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
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
        marginTop: 5,
    },
    removeButton: {
        backgroundColor: "red",
        alignSelf: 'flex-end',
    },
    locationsListContent: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 50,
        fontSize: 16,
    },
    lastUpdated: {
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
    },
});

export default SavedLocationsScreen;
