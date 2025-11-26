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
    borderColor = "transparent"
}) => {
    
    // progress bar animation
    const progressAnimation = useRef(new Animated.Value(min)).current;

    useEffect(() => {
        let adjustedProgress = progress;
        if (adjustedProgress > max) {
            adjustedProgress = max;
        }

        Animated.timing(progressAnimation, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, [progressAnimation, progress, max]);

    if (!visible) return null;

    return (
        <View style={[styles.container, {backgroundColor: backColor, borderColor: borderColor}]}>
            <View style={styles.content}>
                <Text style={styles.text}>{text}</Text>
                <Animated.View style={[styles.bar, {width:progressAnimation.interpolate({
                    inputRange:[min, max], 
                    outputRange:["0%", "100%"]
                }),
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
        borderRadius: 10,
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
        height: 20,
        borderWidth: 0,
        borderRadius: 9
    },
});

export default LoadingBar;