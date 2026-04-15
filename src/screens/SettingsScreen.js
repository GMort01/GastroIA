// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import ProSideMenu from '../components/ProSideMenu';
import { useSettings } from '../context/SettingsContext';

export default function SettingsScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const { darkMode, notificationsEnabled, setDarkMode, setNotificationsEnabled, theme } = useSettings();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ProSideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />
      
      <View style={{ paddingHorizontal: 20 }}>
        <HeaderComponent onOpenMenu={() => setMenuVisible(true)} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Configuración</Text>

        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Preferencias de la App</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingIconText}>
              <Ionicons name="notifications-outline" size={24} color={theme.primary} />
              <Text style={styles.settingText}>Notificaciones Push</Text>
            </View>
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled} 
              trackColor={{ false: '#767577', true: theme.primaryLight }} 
              thumbColor={notificationsEnabled ? theme.primary : '#f4f3f4'} 
            />
          </View>
          <Text style={styles.statusText}>
            {notificationsEnabled ? 'Notificaciones activadas' : 'Notificaciones desactivadas'}
          </Text>

          <View style={styles.settingRow}>
            <View style={styles.settingIconText}>
              <Ionicons name="moon-outline" size={24} color={theme.primary} />
              <Text style={styles.settingText}>Modo Oscuro</Text>
            </View>
            <Switch 
              value={darkMode} 
              onValueChange={setDarkMode} 
              trackColor={{ false: '#767577', true: theme.primaryLight }} 
              thumbColor={darkMode ? theme.primary : '#f4f3f4'} 
            />
          </View>
          <Text style={styles.statusText}>
            {darkMode ? 'Modo oscuro activado' : 'Modo claro activado'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    content: { paddingHorizontal: 20, paddingBottom: 40, backgroundColor: theme.background },
    title: { fontSize: 28, fontWeight: 'bold', color: theme.text, marginBottom: 25 },
    settingSection: { 
      marginBottom: 25, 
      backgroundColor: theme.surface, 
      borderRadius: 16, 
      padding: 15, 
      shadowColor: theme.shadow, 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.05, 
      shadowRadius: 8, 
      elevation: 3 
    },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.border },
    settingIconText: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    settingText: { fontSize: 16, color: theme.text, marginLeft: 15, fontWeight: '500', flexShrink: 1 },
    statusText: { color: theme.textSecondary, fontSize: 14, marginTop: 6, marginLeft: 46 },
  });