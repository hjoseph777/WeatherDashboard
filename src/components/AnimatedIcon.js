import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Easing } from 'react-native'; // <--- Added Easing here

/**
 * AnimatedIcon Component - Developer 3: Animated weather icons
 * This component creates animated weather icons with spring/timing animations
 */
const AnimatedIcon = ({ iconName = "☀️", animationType = "bounce" }) => {
  // 1. Existing Value (Scale/Opacity)
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  // 2. NEW Value (Rotation)
  const animatedRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // --- ROTATION ANIMATION ---
    Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration: 5000, // 5 seconds
        easing: Easing.linear, 
        useNativeDriver: true,
      })
    ).start();

    // --- BOUNCE/FADE ANIMATION  ---
    if (animationType === "bounce") {
      Animated.loop(
        Animated.sequence([
          Animated.spring(animatedValue, {
            toValue: 1,
            tension: 100,
            friction: 3,
            useNativeDriver: true,
          }),
          Animated.spring(animatedValue, {
            toValue: 0,
            tension: 100,
            friction: 3,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [animationType]); // Dependencies

  // Define Interpolations
  const scaleInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const opacityInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const rotateInterpolation = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Apply styles
  const animatedStyle = {
    opacity: opacityInterpolation,
    transform: [
      { scale: scaleInterpolation },
      { rotate: rotateInterpolation } 
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.icon, animatedStyle]}>
        {iconName}
      </Animated.Text>
      {/* <Text style={styles.subtitle}>Developer 3: Modals, Notifications & Animations</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#45b7d1',
    textAlign: 'center',
  },
});

export default AnimatedIcon;