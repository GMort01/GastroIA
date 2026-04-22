// App.js
// Componente raíz de la aplicación GastroIA
// Envuelve toda la app con los Context Providers necesarios para estado global
// Incluye: Carrito, Historial, Favoritos, Configuración y Perfil

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { ProfileProvider } from './src/context/ProfileContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* SettingsProvider: Gestiona tema, notificaciones y preferencias generales */}
      <SettingsProvider>
        {/* HistoryProvider: Guarda historial de compras y pedidos */}
        <HistoryProvider>
          {/* FavoritesProvider: Almacena platillos favoritos del usuario */}
          <FavoritesProvider>
            {/* CartProvider: Gestiona artículos en el carrito y cálculos de precio */}
            <CartProvider>
              {/* ProfileProvider: Guarda datos del perfil (dieta, alergias, etc.) */}
              <ProfileProvider>
                {/* StatusBar: Configura la barra de estado del sistema */}
                <StatusBar style="auto" />
                {/* AppNavigator: Sistema de navegación principal de la app */}
                <AppNavigator />
              </ProfileProvider>
            </CartProvider>
          </FavoritesProvider>
        </HistoryProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}