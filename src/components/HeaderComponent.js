// src/components/HeaderComponent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useSettings } from '../context/SettingsContext';

export default function HeaderComponent({ onOpenMenu, onOpenCart, cartCount }) {
  const { theme } = useSettings();
  const styles = getStyles(theme);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onOpenMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color={theme.text} />
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name="chef-hat" size={28} color={theme.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.brandTitle}>Gastro<Text style={{ color: theme.primary }}>IA</Text></Text>
        <Text style={styles.brandSubtitle}>Asistente gourmet</Text>
      </View>

      <TouchableOpacity onPress={onOpenCart} style={styles.cartButton}>
        <Ionicons name="cart-outline" size={28} color={theme.text} />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginBottom: 25,
    },
    menuButton: {
      marginRight: 15,
    },
    iconCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    brandTitle: {
      fontSize: 24,
      fontWeight: '900',
      color: theme.text,
    },
    cartButton: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    cartBadge: {
      position: 'absolute',
      top: 4,
      right: 4,
      backgroundColor: theme.primary,
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    cartBadgeText: {
      color: theme.surface,
      fontSize: 10,
      fontWeight: '700',
    },
    brandSubtitle: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 2,
    },
  });