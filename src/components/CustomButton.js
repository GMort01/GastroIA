// src/components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';

export default function CustomButton({ title, onPress, style, textStyle }) {
  const { theme } = useSettings();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      width: '100%',
    },
    text: {
      color: theme.surface,
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
  });