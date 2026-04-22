import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import CustomButton from '../components/CustomButton';

export default function FavoritesScreen({ navigation }) {
  const { favoriteItems, removeFavorite } = useContext(FavoritesContext);
  const { addItem } = useContext(CartContext);
  const { theme } = useSettings();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
          <Text style={styles.goBackText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Favoritos</Text>
      </View>

      {favoriteItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color={theme.textSecondary} />
          <Text style={styles.emptyTitle}>Tu lista de favoritos está vacía</Text>
          <Text style={styles.emptySubtitle}>Marca platillos como favoritos y encuentra tus antojos más rápido.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text style={styles.itemRestaurant}>{item.restaurantName}</Text>
                <Text style={styles.itemPrice}>${item.precio}</Text>
              </View>
              <View style={styles.actionsRow}>
                <CustomButton
                  title="Agregar al carrito"
                  onPress={() => addItem({ ...item, quantity: 1 })}
                  style={styles.addButton}
                />
                <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.removeButton}>
                  <Ionicons name="trash-bin-outline" size={22} color={theme.error} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    goBackButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    goBackText: {
      marginLeft: 8,
      color: theme.text,
      fontSize: 16,
    },
    title: {
      color: theme.text,
      fontSize: 24,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    emptyTitle: {
      color: theme.text,
      fontSize: 20,
      fontWeight: '600',
      marginTop: 24,
    },
    emptySubtitle: {
      color: theme.textSecondary,
      fontSize: 16,
      marginTop: 10,
      textAlign: 'center',
    },
    listContainer: {
      padding: 20,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 18,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    itemName: {
      color: theme.text,
      fontSize: 18,
      fontWeight: '700',
    },
    itemRestaurant: {
      color: theme.textSecondary,
      marginTop: 6,
      marginBottom: 10,
    },
    itemPrice: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: '700',
    },
    actionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 14,
    },
    addButton: {
      flex: 1,
      marginRight: 12,
    },
    removeButton: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: theme.background,
    },
  });
