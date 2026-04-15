import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import ProSideMenu from '../components/ProSideMenu';
import { ProfileContext } from '../context/ProfileContext';
import { useSettings } from '../context/SettingsContext';

const dietOptions = [
  { key: 'carnivoro', label: 'Carnivoro' },
  { key: 'vegetariano', label: 'Vegetariano' },
  { key: 'vegano', label: 'Vegano' },
  { key: 'ambos', label: 'Ambos' },
];

export default function AccountScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { dietType, setDietType, allergyInput, setAllergyInput, allergies } = useContext(ProfileContext);
  const { theme } = useSettings();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ProSideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20 }}>
            <HeaderComponent onOpenMenu={() => setMenuVisible(true)} />
          </View>

          <View style={styles.profileHeader}>
            <MaterialCommunityIcons name="account-circle" size={80} color={theme.primary} />
            <Text style={styles.title}>Mi Perfil</Text>
            <Text style={styles.subtitle}>Define tu alimentacion y alergias para filtrar las recomendaciones.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Tipo de alimentacion</Text>
            <View style={styles.optionRow}>
              {dietOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionButton,
                    dietType === option.key && styles.optionButtonActive,
                  ]}
                  onPress={() => setDietType(option.key)}
                >
                  <Text style={[
                    styles.optionText,
                    dietType === option.key && styles.optionTextActive,
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.allergiesSection}>
              <Text style={styles.sectionTitle}>Alergias o intolerancias</Text>
              <Text style={styles.helpText}>
                Escribe tus alergias separadas por comas, por ejemplo: gluten, lacteos, mariscos.
              </Text>
              <TextInput
                value={allergyInput}
                onChangeText={setAllergyInput}
                placeholder="Gluten, lacteos, mani..."
                placeholderTextColor={theme.textSecondary}
                style={styles.textInput}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.currentProfile}>
              <Text style={styles.currentLabel}>Estado actual:</Text>
              <Text style={styles.currentValue}>
                {dietOptions.find(option => option.key === dietType)?.label || 'Carnivoro'}
                {allergies.length > 0 ? ` • Alergias: ${allergies.join(', ')}` : ' • Sin alergias registradas'}
              </Text>
            </View>

            <Text style={styles.notice}>
              Las recomendaciones en la pantalla principal se ajustaran a tus preferencias y ocultaran opciones no compatibles.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    scrollContent: { paddingBottom: 40, backgroundColor: theme.background },
    profileHeader: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 10 },
    title: { fontSize: 28, fontWeight: '800', color: theme.text, marginTop: 15 },
    subtitle: { fontSize: 16, color: theme.textSecondary, marginTop: 8, lineHeight: 22 },
    card: {
      margin: 20,
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 20,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 15,
      elevation: 4,
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: theme.text, marginBottom: 12 },
    optionRow: { flexDirection: 'row', flexWrap: 'wrap' },
    optionButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 14,
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
      marginRight: 10,
      marginBottom: 10,
    },
    optionButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    optionText: { fontSize: 14, color: theme.text, fontWeight: '600' },
    optionTextActive: { color: theme.surface },
    allergiesSection: { marginTop: 10 },
    helpText: { fontSize: 14, color: theme.textSecondary, marginBottom: 10, lineHeight: 20 },
    textInput: {
      backgroundColor: theme.background,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 16,
      color: theme.text,
      fontSize: 16,
      minHeight: 90,
      textAlignVertical: 'top',
    },
    currentProfile: { marginTop: 20 },
    currentLabel: { fontSize: 14, color: theme.textSecondary, marginBottom: 6 },
    currentValue: { fontSize: 16, color: theme.text, fontWeight: '600' },
    notice: { marginTop: 20, fontSize: 14, color: theme.textSecondary, lineHeight: 22 },
  });

