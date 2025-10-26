import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

/**
 * AnimatedIcon Component - Developer 3: Animated weather icons
 * This component creates animated weather icons with spring/timing animations
 */
const AnimatedIcon = ({ iconName = "☀️", animationType = "bounce" }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animationType === "bounce") {
      // Spring animation for bouncing effect
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
      // Timing animation for fade effect
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [animationType]);

  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1],
    }),
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