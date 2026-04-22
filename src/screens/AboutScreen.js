import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';

export default function AboutScreen() {
  const navigation = useNavigation();
  const { theme } = useSettings();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={theme.primary} />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Sobre GastroIA</Text>
        <Text style={styles.paragraph}>
          Una aplicación móvil interactiva que ayuda a los usuarios a decidir qué comer según su antojo y presupuesto, integrando una calculadora de pedidos y propinas.
        </Text>
        <Text style={styles.paragraph}>
          Este proyecto es el entregable del Reto Expo MVP de Utilidad Instantánea para la asignatura de Desarrollo de Aplicaciones Móviles de la Fundación Universitaria Católica Lumen Gentium (UNICATÓLICA).
        </Text>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    header: {
      paddingTop: 18,
      paddingHorizontal: 20,
      paddingBottom: 12,
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backText: {
      color: theme.primary,
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '700',
    },
    content: {
      flex: 1,
      margin: 16,
      padding: 24,
      backgroundColor: theme.surface,
      borderRadius: 24,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 16,
    },
    paragraph: {
      fontSize: 16,
      color: theme.textSecondary,
      lineHeight: 24,
      marginBottom: 14,
    },
  });