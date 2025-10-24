// src/screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import AnimatedIcon from "../components/AnimatedIcon";
import WeatherCard from "../components/WeatherCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Mock data — replace with API data later
  const weatherDetails = {
    city: "Toronto",
    temp: "25°C",
    humidity: "60%",
    wind: "10 km/h",
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Dashboard</Text>

      <AnimatedIcon icon="🌤️" animationType="bounce" />

      <WeatherCard />

      <TouchableOpacity
        style={[styles.button, styles.refreshButton]}
        onPress={handleRefresh}
      >
        <Text style={styles.buttonText}>🔄 Refresh Weather</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.forecastButton]}
        onPress={() => navigation.navigate("Forecast")}
      >
        <Text style={styles.buttonText}>📅 View Forecast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.savedButton]}
        onPress={() => navigation.navigate("SavedLocations")}
      >
        <Text style={styles.buttonText}>📍 Saved Locations</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.detailsButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>ℹ️ View Details</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{weatherDetails.city}</Text>
            <Text>Temperature: {weatherDetails.temp}</Text>
            <Text>Humidity: {weatherDetails.humidity}</Text>
            <Text>Wind Speed: {weatherDetails.wind}</Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <LoadingSpinner visible={loading} text="Refreshing..." />
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
