// src/screens/HomeScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import CustomButton from '../components/CustomButton';
import HeaderComponent from '../components/HeaderComponent'; 
import ProSideMenu from '../components/ProSideMenu'; // <-- IMPORTAMOS EL MENÚ AQUÍ
import { colors } from '../theme/colors';
import { getAIRecommendations } from '../services/aiService'; // <-- IMPORTAMOS EL SERVICIO DE IA
import { CartContext } from '../context/CartContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addItem, cartCount } = useContext(CartContext);
  const [antojo, setAntojo] = useState('');
  const [respuestaIA, setRespuestaIA] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  
  // <-- ESTADO PARA CONTROLAR EL MENÚ
  const [menuVisible, setMenuVisible] = useState(false);

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
      const results = await getAIRecommendations({ search: antojo });
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
      
      {/* <-- AQUÍ PONEMOS EL MENÚ LATERAL INVISIBLE ESPERANDO A SER LLAMADO */}
      <ProSideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      {/* KeyboardAvoidingView evita que el teclado tape los inputs en iOS/Android */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Usamos ScrollView para que la pantalla sea desplazable */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 1. Header Pro <-- LE PASAMOS LA FUNCIÓN PARA ABRIR EL MENÚ */}
          <HeaderComponent onOpenMenu={() => setMenuVisible(true)} onOpenCart={() => navigation.navigate('Cart')} cartCount={cartCount} />

          {/* 2. Sección del Input con ícono */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>¿Qué te apetece hoy?</Text>
            
            <View style={styles.inputContainer}>
              {/* Ícono de búsqueda dentro del input */}
              <Ionicons name="search-outline" size={22} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ej: Pasta italiana, tacos al pastor..."
                placeholderTextColor={colors.textSecondary}
                value={antojo}
                onChangeText={setAntojo}
                multiline={true} // Permite varias líneas para una descripción larga
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.buttonWrapper}>
              <CustomButton title="Analizar y Recomendar" onPress={analizarAntojo} />
            </View>
          </View>

          {/* 3. Sección de Resultados (Simulación de Chat IA) */}
          {respuestaIA !== '' && (
            <View style={styles.aiResponseSection}>
              <View style={styles.aiHeader}>
                <Ionicons name="logo-electron" size={20} color={colors.primary} />
                <Text style={styles.aiHeaderText}>Respuesta de GastroIA</Text>
              </View>
              <View style={styles.aiBubble}>
                <Text style={styles.aiText}>{respuestaIA}</Text>
              </View>
            </View>
          )}

          {/* 4. Indicador de carga */}
          {loading && (
            <View style={styles.loadingSection}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Analizando tus preferencias...</Text>
            </View>
          )}

          {/* 5. Lista de Recomendaciones */}
          {recommendations.length > 0 && (
            <View style={styles.recommendationsSection}>
              <Text style={styles.recommendationsTitle}>Recomendaciones para ti:</Text>
              <FlatList
                data={recommendations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
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
                    {item.isVegan && <Text style={styles.veganBadge}>🌱 Vegano</Text>}
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, // Espacio extra al final
  },
  inputSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16, // Bordes muy redondeados
    paddingHorizontal: 15,
    paddingVertical: 10,
    // Sombra sutil (Pro shadow)
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputIcon: {
    marginTop: 12, // Alinea el ícono con la primera línea de texto multilínea
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    minHeight: 80, // Altura mínima para el texto multilínea
    textAlignVertical: 'top', // Empieza el texto arriba en Android
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
    color: colors.primary,
    marginLeft: 8,
    textTransform: 'uppercase', // Estilo moderno
    letterSpacing: 1,
  },
  aiBubble: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    borderBottomLeftRadius: 5, // Efecto de burbuja de chat
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  aiText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24, // Mejor legibilidad
  },
  loadingSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textSecondary,
  },
  recommendationsSection: {
    marginTop: 20,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
  },
  recommendationItem: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
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
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  itemDescription: {
    fontSize: 14,
    color: colors.textSecondary,
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
    color: colors.text,
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  veganBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 12,
    color: colors.primary,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '700',
  }
});