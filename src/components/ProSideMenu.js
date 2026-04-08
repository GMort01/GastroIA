// src/components/ProSideMenu.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// IMPORTAMOS LOS HOOKS OFICIALES PARA NAVEGAR SIN ERRORES
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { colors } from '../theme/colors';

// Ya no necesitamos recibir "navigation" como prop
export default function ProSideMenu({ visible, onClose }) {
  
  // Magia pura: el menú obtiene su propia navegación y ruta actual
  const navigation = useNavigation();
  const route = useRoute(); 
  const currentScreen = route.name; // Nos dice si estamos en 'Home', 'Account', etc.

  const handleNavigation = (screenName) => {
    onClose(); 
    setTimeout(() => {
      navigation.navigate(screenName); 
    }, 150); 
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backgroundTouch} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.menuContainer}>
          <SafeAreaView style={{ flex: 1 }}>
            
            <View style={styles.profileHeader}>
              <MaterialCommunityIcons name="account-circle" size={70} color={colors.surface} />
              <Text style={styles.userName}>Gourmet User</Text>
              <Text style={styles.userEmail}>usuario@gastroia.com</Text>
            </View>

            {/* AHORA USAMOS currentScreen PARA SABER QUÉ BOTÓN PINTAR */}
            <View style={styles.menuItems}>
              <MenuItem 
                icon="home-outline" 
                title="Explorar Menús" 
                active={currentScreen === 'Home'}
                onPress={() => handleNavigation('Home')} 
              />
              <MenuItem 
                icon="person-outline" 
                title="Mi Perfil" 
                active={currentScreen === 'Account'}
                onPress={() => handleNavigation('Account')} 
              />
              <MenuItem 
                icon="cart-outline" 
                title="Carrito" 
                active={currentScreen === 'Cart'}
                onPress={() => handleNavigation('Cart')} 
              />
              <MenuItem 
                icon="settings-outline" 
                title="Configuración" 
                active={currentScreen === 'Settings'}
                onPress={() => handleNavigation('Settings')} 
              />
              <MenuItem 
                icon="information-circle-outline" 
                title="Sobre la app" 
                active={currentScreen === 'About'}
                onPress={() => handleNavigation('About')} 
              />
            </View>

            <View style={styles.logoutSection}>
              <TouchableOpacity style={styles.logoutButton} onPress={() => alert('¡Sesión cerrada con éxito!')}>
                <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const MenuItem = ({ icon, title, onPress, active }) => (
  <TouchableOpacity style={[styles.menuItem, active && styles.menuItemActive]} onPress={onPress}>
    <Ionicons name={icon} size={24} color={active ? colors.primary : colors.textSecondary} />
    <Text style={[styles.menuItemText, active && styles.menuItemTextActive]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.6)' },
  backgroundTouch: { flex: 1 },
  menuContainer: { width: '75%', height: '100%', backgroundColor: colors.surface, position: 'absolute', left: 0, shadowColor: '#000', shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 15 },
  profileHeader: { backgroundColor: colors.primary, paddingTop: 40, paddingBottom: 30, paddingHorizontal: 20, alignItems: 'flex-start' },
  userName: { color: colors.surface, fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  userEmail: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 2 },
  menuItems: { flex: 1, paddingTop: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
  menuItemActive: { backgroundColor: colors.primaryLight + '40', borderRightWidth: 4, borderRightColor: colors.primary },
  menuItemText: { fontSize: 16, color: colors.text, marginLeft: 15, fontWeight: '500' },
  menuItemTextActive: { color: colors.primary, fontWeight: 'bold' },
  logoutSection: { padding: 20, borderTopWidth: 1, borderTopColor: colors.border, marginBottom: 20 },
  logoutButton: { flexDirection: 'row', alignItems: 'center' },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#FF3B30', marginLeft: 15 }
});