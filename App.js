// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { ProfileProvider } from './src/context/ProfileContext';
import { SettingsProvider } from './src/context/SettingsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <CartProvider>
          <ProfileProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </ProfileProvider>
        </CartProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}