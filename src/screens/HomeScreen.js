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
import { useFavorites } from '../context/FavoritesContext';
import { useSettings } from '../context/SettingsContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addItem, cartCount } = useContext(CartContext);
  const { dietType, allergies } = useContext(ProfileContext);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { notificationsEnabled, theme } = useSettings();
  const [antojo, setAntojo] = useState('');
  const [respuestaIA, setRespuestaIA] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [budget, setBudget] = useState('');
  const [budgetFeedback, setBudgetFeedback] = useState('');
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
    setBudgetFeedback('');

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

  const budgetAmount = Number(budget.replace(/[^0-9]/g, '')) || 0;
  const budgetRecommendations = budgetAmount > 0
    ? recommendations.filter((item) => item.precio <= budgetAmount)
    : recommendations;
  const budgetMessage = budgetAmount > 0
    ? `Mostrando ${budgetRecommendations.length} platillos dentro de tu presupuesto de $${budgetAmount}.`
    : '';

  const handleBudgetChange = (value) => {
    const formatted = value.replace(/[^0-9]/g, '');
    setBudget(formatted);
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
            data={budgetRecommendations}
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

                  <View style={styles.budgetCard}>
                    <Text style={styles.budgetLabel}>Controla tu presupuesto</Text>
                    <View style={styles.budgetInputRow}>
                      <TextInput
                        style={styles.budgetInput}
                        placeholder="Presupuesto máximo"
                        placeholderTextColor={theme.textSecondary}
                        keyboardType="numeric"
                        value={budget}
                        onChangeText={handleBudgetChange}
                      />
                      <CustomButton title="Aplicar" onPress={() => {
                        setBudgetFeedback(budgetAmount > 0 ? budgetMessage : 'Ingresa un presupuesto válido.');
                      }}
                      style={styles.budgetButton}
                      />
                    </View>
                    {budgetFeedback !== '' && <Text style={styles.budgetFeedback}>{budgetFeedback}</Text>}
                  </View>

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
                  <View style={styles.recommendationsHeader}>
                    <Ionicons name="sparkles" size={24} color={theme.primary} />
                    <Text style={styles.recommendationsTitle}>Recomendaciones para ti</Text>
                  </View>
                )}
                {budgetAmount > 0 && budgetRecommendations.length === 0 && !loading && (
                  <Text style={styles.budgetWarning}>No hay recomendaciones dentro de ese presupuesto. Ajusta el monto o prueba otra búsqueda.</Text>
                )}
              </>
            }
            renderItem={({ item }) => {
              const isVegetarian = item.isVegan || (item.tags && item.tags.some(tag => tag.toLowerCase().includes('vegetariana') || tag.toLowerCase().includes('vegana')));
              const getDishEmoji = () => {
                const categoria = item.categoria?.toLowerCase() || '';
                if (categoria.includes('pasta')) return '🍝';
                if (categoria.includes('pizza')) return '🍕';
                if (categoria.includes('tacos') || categoria.includes('taco')) return '🌮';
                if (categoria.includes('sushi')) return '🍣';
                if (categoria.includes('burger')) return '🍔';
                if (categoria.includes('ensalada')) return '🥗';
                if (categoria.includes('postre') || categoria.includes('dessert')) return '🍰';
                return '🍽️';
              };
              return (
                <View style={styles.recommendationItem}>
                  <View style={styles.itemHeaderNew}>
                    <View style={styles.emojiContainer}>
                      <Text style={styles.emojiText}>{getDishEmoji()}</Text>
                    </View>
                    <View style={styles.itemTitleSection}>
                      <Text style={styles.itemNameNew} numberOfLines={2}>{item.nombre}</Text>
                      <Text style={styles.itemPrice}>${item.precio.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.favoriteBtnCompact} onPress={() => isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item)}>
                      <Ionicons
                        name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                        size={20}
                        color={isFavorite(item.id) ? theme.primary : theme.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>

                  {item.isVegan ? (
                    <View style={[styles.badgeNew, styles.veganBadge]}>
                      <Text style={styles.badgeText}>🌱 Vegano</Text>
                    </View>
                  ) : isVegetarian ? (
                    <View style={[styles.badgeNew, styles.vegetarianBadge]}>
                      <Text style={styles.badgeText}>🥦 Vegetariano</Text>
                    </View>
                  ) : null}

                  <Text style={styles.itemDescription}>{item.descripcion}</Text>

                  <View style={styles.itemMetaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="location-outline" size={14} color={theme.textSecondary} />
                      <Text style={styles.metaText} numberOfLines={1}>{item.restaurantName}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="timer-outline" size={14} color={theme.textSecondary} />
                      <Text style={styles.metaText}>{item.deliveryTime}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.addButtonNew} onPress={() => addItem(item)}>
                    <Ionicons name="add-circle" size={18} color={theme.surface} style={{ marginRight: 6 }} />
                    <Text style={styles.addButtonTextNew}>Añadir al carrito</Text>
                  </TouchableOpacity>
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
      paddingBottom: 40,
    },
    inputSection: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      backgroundColor: theme.background,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '800',
      color: theme.text,
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    profileHint: {
      fontSize: 13,
      color: theme.textSecondary,
      marginBottom: 18,
      fontWeight: '500',
      lineHeight: 19,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.surface,
      borderColor: theme.border,
      borderWidth: 1.5,
      borderRadius: 18,
      paddingHorizontal: 16,
      paddingVertical: 12,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    inputIcon: {
      marginTop: 14,
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: theme.text,
      minHeight: 80,
      textAlignVertical: 'top',
      fontWeight: '500',
    },
    buttonWrapper: {
      marginTop: 18,
    },
    aiResponseSection: {
      marginTop: 16,
      paddingHorizontal: 20,
    },
    aiHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingLeft: 2,
    },
    aiHeaderText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.primary,
      marginLeft: 8,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    notificationInfo: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 14,
      fontWeight: '500',
      backgroundColor: theme.surface,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    aiBubble: {
      backgroundColor: theme.primary + '12',
      padding: 16,
      borderRadius: 20,
      borderBottomLeftRadius: 6,
      borderWidth: 1.5,
      borderColor: theme.primary + '30',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 3,
    },
    aiText: {
      fontSize: 15,
      color: theme.text,
      lineHeight: 24,
      fontWeight: '500',
    },
    loadingSection: {
      alignItems: 'center',
      marginTop: 28,
      marginBottom: 28,
      paddingVertical: 20,
    },
    loadingText: {
      marginTop: 12,
      fontSize: 15,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    recommendationsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 24,
      marginBottom: 16,
    },
    recommendationsTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: theme.text,
      marginLeft: 10,
      letterSpacing: -0.3,
    },
    recommendationItem: {
      backgroundColor: theme.surface,
      marginHorizontal: 20,
      marginBottom: 14,
      paddingTop: 14,
      paddingHorizontal: 16,
      paddingBottom: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 4,
    },
    budgetCard: {
      marginTop: 22,
      marginHorizontal: 20,
      padding: 18,
      borderRadius: 18,
      backgroundColor: theme.primary + '08',
      borderWidth: 1.5,
      borderColor: theme.primary + '25',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    budgetLabel: {
      color: theme.text,
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 12,
      letterSpacing: 0.3,
    },
    budgetInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    budgetInputSpacer: {
      width: 10,
    },
    budgetInput: {
      flex: 1,
      backgroundColor: theme.background,
      color: theme.text,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1.5,
      borderColor: theme.border,
      fontWeight: '600',
      fontSize: 15,
    },
    budgetButton: {
      minWidth: 90,
    },
    budgetFeedback: {
      marginTop: 12,
      color: theme.textSecondary,
      fontSize: 13,
      fontWeight: '600',
      backgroundColor: theme.background,
      padding: 10,
      borderRadius: 10,
      textAlign: 'center',
    },
    budgetWarning: {
      marginHorizontal: 20,
      marginBottom: 14,
      color: '#92400E',
      backgroundColor: '#FEF3C7',
      padding: 14,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: '#FCD34D',
      fontSize: 13,
      fontWeight: '600',
      lineHeight: 19,
    },
    // New item card styles
    itemHeaderNew: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
      gap: 12,
    },
    emojiContainer: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: theme.primary + '15',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.primary + '30',
    },
    emojiText: {
      fontSize: 28,
    },
    itemTitleSection: {
      flex: 1,
    },
    itemNameNew: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 4,
      lineHeight: 20,
      letterSpacing: -0.2,
    },
    itemPrice: {
      fontSize: 15,
      fontWeight: '800',
      color: theme.primary,
      letterSpacing: -0.3,
    },
    favoriteBtnCompact: {
      padding: 8,
    },
    badgeNew: {
      alignSelf: 'flex-start',
      fontSize: 11,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
      borderWidth: 1.5,
      fontWeight: '700',
      marginBottom: 10,
    },
    badgeText: {
      fontSize: 11,
      fontWeight: '700',
    },
    veganBadge: {
      backgroundColor: theme.background,
      color: theme.primary,
      borderColor: theme.primary,
    },
    vegetarianBadge: {
      backgroundColor: '#F0FDF4',
      color: '#166534',
      borderColor: '#86EFAC',
    },
    itemDescription: {
      fontSize: 13,
      color: theme.textSecondary,
      marginBottom: 12,
      lineHeight: 19,
      fontWeight: '500',
    },
    itemMetaRow: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 12,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flex: 1,
    },
    metaText: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: '600',
      flex: 1,
    },
    addButtonNew: {
      backgroundColor: theme.primary,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    addButtonTextNew: {
      color: theme.surface,
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 0.2,
    },
  });