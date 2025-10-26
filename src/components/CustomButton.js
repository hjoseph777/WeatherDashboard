import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

/**
 * CustomButton Component - Developer 2: Interactive components
 * This component creates interactive touchable elements with gestures
 */
const CustomButton = ({ title, onPress, style }) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{title || 'Custom Button'}</Text>
        {/* <Text style={styles.subtitle}>Developer 2: Interactive Components & Gestures</Text> */}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4ecdc4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
});

export default CustomButton;