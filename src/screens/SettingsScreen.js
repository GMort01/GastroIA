// src/screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import ProSideMenu from '../components/ProSideMenu';
import { colors } from '../theme/colors';

export default function SettingsScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Estados simulados para los ajustes
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [veganMode, setVeganMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ProSideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />
      
      <View style={{ paddingHorizontal: 20 }}>
        <HeaderComponent onOpenMenu={() => setMenuVisible(true)} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Configuración</Text>

        {/* Sección: Preferencias de la App */}
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Preferencias de la App</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingIconText}>
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Notificaciones Push</Text>
            </View>
            <Switch 
              value={notifications} 
              onValueChange={setNotifications} 
              trackColor={{ false: '#767577', true: colors.primaryLight }} 
              thumbColor={notifications ? colors.primary : '#f4f3f4'} 
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingIconText}>
              <Ionicons name="moon-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Modo Oscuro</Text>
            </View>
            <Switch 
              value={darkMode} 
              onValueChange={setDarkMode} 
              trackColor={{ false: '#767577', true: colors.primaryLight }} 
              thumbColor={darkMode ? colors.primary : '#f4f3f4'} 
            />
          </View>
        </View>

        {/* Sección: Filtros de Comida */}
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Filtros Alimenticios</Text>
          
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingIconText}>
              <Ionicons name="leaf-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Solo recomendaciones Veganas</Text>
            </View>
            <Switch 
              value={veganMode} 
              onValueChange={setVeganMode} 
              trackColor={{ false: '#767577', true: colors.primaryLight }} 
              thumbColor={veganMode ? colors.primary : '#f4f3f4'} 
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 25 },
  settingSection: { 
    marginBottom: 25, 
    backgroundColor: colors.surface, 
    borderRadius: 16, 
    padding: 15, 
    shadowColor: colors.shadow, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 8, 
    elevation: 3 
  },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  settingIconText: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingText: { fontSize: 16, color: colors.text, marginLeft: 15, fontWeight: '500', flexShrink: 1 }
});