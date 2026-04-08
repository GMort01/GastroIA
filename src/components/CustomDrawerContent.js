// src/components/CustomDrawerContent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      {/* 1. Cabecera del Perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {/* Imagen de perfil circular (puedes poner una URL de imagen real luego) */}
          <MaterialCommunityIcons name="account-circle" size={80} color={colors.surface} />
        </View>
        <Text style={styles.userName}>Gourmet User</Text>
        <Text style={styles.userEmail}>usuario@gastroia.com</Text>
      </View>

      {/* 2. Lista de navegación (los items que ya definimos) */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* 3. Pie de página: Botón de Cerrar Sesión */}
      <View style={styles.logoutSection}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => alert('Cerrando sesión...')}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  userName: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  logoutSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 10,
  },
});