import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Main App Component
 * Using src/ folder structure with React Navigation (NOT Expo Router)
 * 
 * Architecture Decision:
 * - Traditional src/ structure for team simplicity
 * - React Navigation for familiar navigation patterns
 * - No additional Expo Router overhead
 */
export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
