// src/screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet, ScrollView
} from "react-native";
import AnimatedIcon from "../components/AnimatedIcon";
import WeatherCard from "../components/WeatherCard";
import LoadingSpinner from "../components/LoadingSpinner";
import WeatherAPI from '../services/weatherAPI';
import CustomButton from "../components/CustomButton";
import ForecastScreen from "./ForecastScreen";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [currentCity, setCurrentCity] = useState('Toronto');

  // load weather data when component mounts
  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async (city = currentCity) => {
    try {
      setIsLoading(true);
      console.log('Loading weather data for:', city);
      
      const result = await WeatherAPI.getCurrentWeather(city);
      console.log('Weather API result:', result);
      
      setWeatherData(result);
    } catch (error) {
      console.error('Error loading weather data:', error);
      setWeatherData({
        success: false,
        error: error.message || 'Failed to load weather data'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // refresh weather data
  const handleRefresh = () => {
    loadWeatherData();
  };

  // handle city change
  const handleCityChange = (newCity) => {
    if (newCity && newCity.trim()) {
      setCurrentCity(newCity.trim());
      loadWeatherData(newCity.trim());
    }
  };

  /* simple city selection without navigation
  const handleQuickCityChange = (city) => {
    setCurrentCity(city);
    loadWeatherData(city);
  };*/

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Weather Dashboard</Text>
          
        <AnimatedIcon iconName="🌤️" animationType="bounce" />
          
        <WeatherCard weatherData={weatherData}/>
          
        <ForecastScreen />
  
        <CustomButton 
          title="Refresh Weather" 
          onPress={handleRefresh}
        />
                    
        {/* <CustomButton 
          title="Saved Locations" 
          onPress={() => navigation.navigate('SavedLocations')}
          style={{ backgroundColor: '#f7b731' }}
        /> */}
      </ScrollView>
      <LoadingSpinner visible={isLoading} text="Fetching weather data..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0077b6",
    marginBottom: 25,
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
    elevation: 3,
  },
  refreshButton: {
    backgroundColor: "#0077b6",
  },
  forecastButton: {
    backgroundColor: "#00b4d8",
  },
  savedButton: {
    backgroundColor: "#0096c7",
  },
  detailsButton: {
    backgroundColor: "#48cae4",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: 280,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0077b6",
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#00b4d8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
