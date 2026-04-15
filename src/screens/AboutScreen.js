import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';

export default function AboutScreen() {
  const { theme } = useSettings();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Sobre GastroIA</Text>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background },
    text: { fontSize: 20, color: theme.text },
  });