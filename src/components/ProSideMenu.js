// src/components/ProSideMenu.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { useSettings } from '../context/SettingsContext';

export default function ProSideMenu({ visible, onClose }) {
  const navigation = useNavigation();
  const route = useRoute(); 
  const currentScreen = route.name;
  const { theme } = useSettings();
  const styles = getStyles(theme);

  const handleNavigation = (screenName) => {
    console.log('Navigating to:', screenName);
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
              <MaterialCommunityIcons name="account-circle" size={70} color={theme.surface} />
              <Text style={styles.userName}>Gourmet User</Text>
              <Text style={styles.userEmail}>usuario@gastroia.com</Text>
            </View>

            <View style={styles.menuItems}>
              <MenuItem 
                icon="home-outline" 
                title="Explorar Menús" 
                active={currentScreen === 'Home'}
                onPress={() => handleNavigation('Home')} 
                styles={styles}
                theme={theme}
              />
              <MenuItem 
                icon="person-outline" 
                title="Mi Perfil" 
                active={currentScreen === 'Account'}
                onPress={() => handleNavigation('Account')} 
                styles={styles}
                theme={theme}
              />
              <MenuItem 
                icon="cart-outline" 
                title="Carrito" 
                active={currentScreen === 'Cart'}
                onPress={() => handleNavigation('Cart')} 
                styles={styles}
                theme={theme}
              />
              <MenuItem 
                icon="heart-outline" 
                title="Favoritos" 
                active={currentScreen === 'Favorites'}
                onPress={() => handleNavigation('Favorites')} 
                styles={styles}
                theme={theme}
              />
              <MenuItem 
                icon="time-outline" 
                title="Historial" 
                active={currentScreen === 'History'}
                onPress={() => handleNavigation('History')} 
                styles={styles}
                theme={theme}
              />
              <MenuItem 
                icon="settings-outline" 
                title="Configuración" 
                active={currentScreen === 'Settings'}
                onPress={() => handleNavigation('Settings')} 
                styles={styles}
                theme={theme}
              />
              <MenuItem 
                icon="information-circle-outline" 
                title="Sobre la app" 
                active={currentScreen === 'About'}
                onPress={() => handleNavigation('About')} 
                styles={styles}
                theme={theme}
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

  // Ahora recibe styles y theme desde el padre
const MenuItem = ({ icon, title, onPress, active, styles, theme }) => (
  <TouchableOpacity
    style={[
      styles.menuItem,
      active && {
        backgroundColor: theme.primaryLight + '40',
        borderRightWidth: 4,
        borderRightColor: theme.primary,
      },
    ]}
    onPress={onPress}
  >
    <Ionicons name={icon} size={24} color={active ? theme.primary : theme.textSecondary} />
    <Text style={[styles.menuItemText, active && { color: theme.primary, fontWeight: 'bold' }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const getStyles = (theme) =>
  StyleSheet.create({
    overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.6)' },
    backgroundTouch: { flex: 1 },
    menuContainer: { width: '75%', height: '100%', backgroundColor: theme.surface, position: 'absolute', left: 0, shadowColor: '#000', shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 15 },
    profileHeader: { backgroundColor: theme.primary, paddingTop: 40, paddingBottom: 30, paddingHorizontal: 20, alignItems: 'flex-start' },
    userName: { color: theme.surface, fontSize: 22, fontWeight: 'bold', marginTop: 10 },
    userEmail: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 2 },
    menuItems: { flex: 1, paddingTop: 20 },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
    menuItemText: { fontSize: 16, color: theme.text, marginLeft: 15, fontWeight: '500' },
    logoutSection: { padding: 20, borderTopWidth: 1, borderTopColor: theme.border, marginBottom: 20 },
    logoutButton: { flexDirection: 'row', alignItems: 'center' },
    logoutText: { fontSize: 16, fontWeight: 'bold', color: '#FF3B30', marginLeft: 15 },
  });