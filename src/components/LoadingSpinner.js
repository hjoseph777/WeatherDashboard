import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

/**
 * LoadingSpinner Component - Developer 1: Progress indicators
 * This component shows loading states during API data retrieval
 */
const LoadingSpinner = ({ visible = false, text = "Loading..." }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.subtitle}>Developer 1: API Integration & Progress Management</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  spinner: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 150,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LoadingSpinner;