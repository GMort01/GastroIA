// src/screens/HomeScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import CustomButton from '../components/CustomButton';
import HeaderComponent from '../components/HeaderComponent'; 
import ProSideMenu from '../components/ProSideMenu';
import { getAIRecommendations } from '../services/aiService';
import { CartContext } from '../context/CartContext';
import { ProfileContext } from '../context/ProfileContext';
import { useSettings } from '../context/SettingsContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addItem, cartCount } = useContext(CartContext);
  const { dietType, allergies } = useContext(ProfileContext);
  const { notificationsEnabled, theme } = useSettings();
  const [antojo, setAntojo] = useState('');
  const [respuestaIA, setRespuestaIA] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  
  const [menuVisible, setMenuVisible] = useState(false);
  const styles = getStyles(theme);

  const analizarAntojo = async () => {
    if (antojo.trim() === '') {
      setRespuestaIA('Dime qué te gustaría comer hoy para empezar a buscar. ✨');
      setRecommendations([]);
      return;
    }
    setLoading(true);
    setRespuestaIA('');
    setRecommendations([]);

    try {
      const results = await getAIRecommendations({ search: antojo, dietType, allergies });
      setRecommendations(results);
      setRespuestaIA(`¡Encontré ${results.length} recomendaciones basadas en "${antojo}"!`);
    } catch (error) {
      setRespuestaIA('Lo siento, hubo un error al buscar recomendaciones. Inténtalo de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProSideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <HeaderComponent onOpenMenu={() => setMenuVisible(true)} onOpenCart={() => navigation.navigate('Cart')} cartCount={cartCount} />

          <FlatList
            data={recommendations}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <>
                <View style={styles.inputSection}>
                  <Text style={styles.sectionTitle}>¿Qué te apetece hoy?</Text>
                  <Text style={styles.profileHint}>
                    Filtros activos: {dietType === 'ambos' ? 'Sin restricción' : dietType === 'carnivoro' ? 'Carnívoro' : dietType === 'vegetariano' ? 'Vegetariano' : 'Vegano'}
                    {allergies.length > 0 ? ` • Alergias: ${allergies.join(', ')}` : ''}
                  </Text>

                  <View style={styles.inputContainer}>
                    <Ionicons name="search-outline" size={22} color={theme.textSecondary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Ej: Pasta italiana, tacos al pastor..."
                      placeholderTextColor={theme.textSecondary}
                      value={antojo}
                      onChangeText={setAntojo}
                      multiline={true}
                      numberOfLines={3}
                    />
                  </View>

                  <Text style={styles.notificationInfo}>
                    {notificationsEnabled
                      ? 'Notificaciones activas. Te avisaremos cuando haya sugerencias nuevas.'
                      : 'Notificaciones desactivadas. Actívalas en Configuración.'}
                  </Text>

                  <View style={styles.buttonWrapper}>
                    <CustomButton title="Analizar y Recomendar" onPress={analizarAntojo} />
                  </View>
                </View>

                {respuestaIA !== '' && (
                  <View style={styles.aiResponseSection}>
                    <View style={styles.aiHeader}>
                      <Ionicons name="logo-electron" size={20} color={theme.primary} />
                      <Text style={styles.aiHeaderText}>Respuesta de GastroIA</Text>
                    </View>
                    <View style={styles.aiBubble}>
                      <Text style={styles.aiText}>{respuestaIA}</Text>
                    </View>
                  </View>
                )}

                {loading && (
                  <View style={styles.loadingSection}>
                    <ActivityIndicator size="large" color={theme.primary} />
                    <Text style={styles.loadingText}>Analizando tus preferencias...</Text>
                  </View>
                )}

                {recommendations.length > 0 && (
                  <Text style={styles.recommendationsTitle}>Recomendaciones para ti:</Text>
                )}
              </>
            }
            renderItem={({ item }) => {
              const isVegetarian = item.isVegan || (item.tags && item.tags.some(tag => tag.toLowerCase().includes('vegetariana') || tag.toLowerCase().includes('vegana')));
              return (
                <View style={styles.recommendationItem}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.nombre}</Text>
                    <Text style={styles.itemPrice}>${item.precio.toFixed(2)}</Text>
                  </View>
                  <Text style={styles.itemDescription}>{item.descripcion}</Text>
                  <View style={styles.itemFooter}>
                    <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                    <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
                  </View>
                  <TouchableOpacity style={styles.addButton} onPress={() => addItem(item)}>
                    <Text style={styles.addButtonText}>Añadir al carrito</Text>
                  </TouchableOpacity>
                  {item.isVegan ? (
                    <Text style={[styles.badge, styles.veganBadge]}>🌱 Vegano</Text>
                  ) : isVegetarian ? (
                    <Text style={[styles.badge, styles.vegetarianBadge]}>🥦 Vegetariano</Text>
                  ) : null}
                </View>
              );
            }}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !loading && !respuestaIA ? <View style={{ paddingBottom: 20 }} /> : null
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    inputSection: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 15,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.surface,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 15,
      paddingVertical: 10,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    inputIcon: {
      marginTop: 12,
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      minHeight: 80,
      textAlignVertical: 'top',
    },
    buttonWrapper: {
      marginTop: 20,
    },
    aiResponseSection: {
      marginTop: 10,
    },
    aiHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingLeft: 5,
    },
    aiHeaderText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.primary,
      marginLeft: 8,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    profileHint: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 12,
    },
    notificationInfo: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 12,
    },
    aiBubble: {
      backgroundColor: theme.surface,
      padding: 20,
      borderRadius: 20,
      borderBottomLeftRadius: 5,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 5,
      elevation: 2,
    },
    aiText: {
      fontSize: 16,
      color: theme.text,
      lineHeight: 24,
    },
    loadingSection: {
      alignItems: 'center',
      marginTop: 20,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.textSecondary,
    },
    recommendationsTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 15,
    },
    recommendationItem: {
      backgroundColor: theme.surface,
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    itemName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      flex: 1,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.primary,
    },
    itemDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 10,
      lineHeight: 20,
    },
    itemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    restaurantName: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.text,
    },
    deliveryTime: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    badge: {
      position: 'absolute',
      top: 10,
      right: 10,
      fontSize: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      borderWidth: 1,
      fontWeight: '700',
    },
    veganBadge: {
      backgroundColor: theme.surface,
      color: theme.primary,
      borderColor: theme.primary,
    },
    vegetarianBadge: {
      backgroundColor: '#f0f7d8',
      color: '#758a1f',
      borderColor: '#b4c251',
    },
    addButton: {
      marginTop: 12,
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
    },
    addButtonText: {
      color: theme.surface,
      fontSize: 14,
      fontWeight: '700',
    },
  });