// src/screens/AboutScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import ProSideMenu from '../components/ProSideMenu';
import { colors } from '../theme/colors';

export default function AboutScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ProSideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />
      
      <View style={{ paddingHorizontal: 20 }}>
        <HeaderComponent onOpenMenu={() => setMenuVisible(true)} />
      </View>

      <View style={styles.content}>
        {/* Logo gigante */}
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="chef-hat" size={80} color={colors.primary} />
        </View>

        {/* Nombre y Versión */}
        <Text style={styles.appName}>Gastro<Text style={{color: colors.primary}}>IA</Text></Text>
        <Text style={styles.version}>Versión 1.0.0</Text>

        {/* Tarjeta de información */}
        <View style={styles.infoCard}>
          <Text style={styles.description}>
            GastroIA es tu asistente culinario personal. Diseñado para recomendarte las mejores opciones 
            gastronómicas basándose en tus antojos e historial de gustos.
          </Text>
        </View>

        {/* Créditos en la parte inferior */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Desarrollado con ❤️ para el Taller</Text>
          <Text style={styles.footerText}>© 2026 Todos los derechos reservados</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: 'center', paddingTop: 20, paddingHorizontal: 20 },
  logoContainer: { 
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    backgroundColor: colors.primaryLight, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20, 
    shadowColor: colors.primary, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 10, 
    elevation: 5 
  },
  appName: { fontSize: 34, fontWeight: '900', color: colors.text },
  version: { fontSize: 16, color: colors.textSecondary, marginTop: 5, fontWeight: '600' },
  infoCard: { 
    backgroundColor: colors.surface, 
    padding: 25, 
    borderRadius: 16, 
    marginTop: 40, 
    shadowColor: colors.shadow, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 8, 
    elevation: 3, 
    width: '100%' 
  },
  description: { fontSize: 16, color: colors.text, textAlign: 'center', lineHeight: 24 },
  footer: { position: 'absolute', bottom: 40, alignItems: 'center' },
  footerText: { fontSize: 14, color: colors.textSecondary, marginTop: 5, fontWeight: '500' }
});