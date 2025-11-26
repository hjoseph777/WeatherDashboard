import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

/* this component shows loading states during API data retrieval */
const LoadingBar = ({ 
    visible = false, 
    text = "Loading...", 
    progress = 0, 
    max = 100, 
    min = 0, 
    backColor = "#FFFFFF", 
    barColor = "#00ccffff",
    borderColor = "transparent",
    indeterminate = false
}) => {
    
    // progress bar animation
    const progressAnimation = useRef(new Animated.Value(min)).current;

    // loading animation (continuous loading)
     useEffect(() => {
        if (!indeterminate || !visible) return;

        // bar animation
        const barAnimation = Animated.loop(
            Animated.sequence([
                // Move bar from left to right
                Animated.timing(progressAnimation, {
                    toValue: 100,
                    duration: 2500,
                    useNativeDriver: false
                }),
                // Reset bar to start
                Animated.timing(progressAnimation, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false
                }),
            ])
        );
        barAnimation.start();

        // stops animation when content loads
        return () => {
            barAnimation.stop();
        };
    }, [indeterminate, visible]);

    // if not visible, don't render
    if (!visible) return null;

    // progress value to width percentage
    const widthInterpolated = progressAnimation.interpolate({
        inputRange: [min, max],
        outputRange: ["0%", "60%"] // Output range (0% width to 100% width)
    });

    return (
        <View style={[styles.container, {backgroundColor: backColor, borderColor: borderColor}]}>
            <View style={styles.content}>
                <Text style={styles.text}>{text}</Text>
                <Animated.View style={[styles.bar, {
                    width: indeterminate ? widthInterpolated : widthInterpolated,
                    backgroundColor: barColor
                }]}></Animated.View>
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
    content: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 6,
        alignItems: 'center',
        minWidth: 200,
    },
    text: {
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    bar: {
        position: "absolute",
        top: 0, 
        left: 0, 
        bottom: 0, 
        right: 0,
        height: 6,
        borderWidth: 0,
        borderRadius: 10,
    },
});

export default LoadingBar;