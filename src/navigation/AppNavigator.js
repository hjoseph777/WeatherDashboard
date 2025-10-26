import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ForecastScreen from '../screens/ForecastScreen';
// import SavedLocationsScreen from '../screens/SavedLocationsScreen';

/**
 * AppNavigator - Main navigation configuration
 * Developer 4: Navigation & Project Documentation
 * Using React Navigation Stack Navigator (NOT Expo Router)
 */

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#45b7d1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Weather Dashboard' }}
        />
        <Stack.Screen 
          name="Forecast" 
          component={ForecastScreen}
          options={{ title: '5-Day Forecast' }}
        />
        {/* <Stack.Screen 
          name="SavedLocations" 
          component={SavedLocationsScreen}
          options={{ title: 'Saved Locations' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;