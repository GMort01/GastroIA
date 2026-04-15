// src/screens/CartScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import CustomButton from '../components/CustomButton';

export default function CartScreen({ navigation }) {
  const { cartItems, cartCount, subtotal, tip, total, increaseQuantity, decreaseQuantity, removeItem, setTip, clearCart } = useContext(CartContext);
  const [tipInput, setTipInput] = useState(String(tip));
  const { theme } = useSettings();
  const styles = getStyles(theme);

  const handleSetTip = () => {
    const parsed = Number(tipInput.replace(/[^0-9]/g, ''));
    setTip(isNaN(parsed) ? 0 : parsed);
  };

  const handleClearCart = () => {
    Alert.alert('Vaciar carrito', '¿Estás seguro de eliminar todos los items?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Vaciar', style: 'destructive', onPress: clearCart },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
          <Text style={styles.backText}>Seguir buscando</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Carrito</Text>
      </View>

      {cartCount === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={48} color={theme.textSecondary} />
          <Text style={styles.emptyCartText}>Tu carrito está vacío.</Text>
          <Text style={styles.emptyCartSubText}>Agrega platillos desde la búsqueda y vuelve cuando quieras.</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={styles.itemCardHeader}>
                  <Text style={styles.itemName}>{item.nombre}</Text>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="trash-bin-outline" size={22} color={theme.error} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemRestaurant}>{item.restaurantName}</Text>
                <Text style={styles.itemPrice}>{item.quantity} × ${item.precio}</Text>
                <View style={styles.quantityRow}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal}</Text>
            </View>
            <View style={styles.tipRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.summaryLabel}>Propina (COP)</Text>
                <TextInput
                  style={styles.tipInput}
                  placeholder="0"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  value={tipInput}
                  onChangeText={setTipInput}
                  onEndEditing={handleSetTip}
                />
              </View>
              <TouchableOpacity style={styles.tipButton} onPress={handleSetTip}>
                <Text style={styles.tipButtonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total}</Text>
            </View>
            <CustomButton title="Finalizar pedido" onPress={() => Alert.alert('Pedido enviado', 'Tu pedido ha sido registrado.')} />
            <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
              <Text style={styles.clearButtonText}>Vaciar carrito</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backText: {
      color: theme.text,
      fontSize: 14,
      marginLeft: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.text,
    },
    emptyCartContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    emptyCartText: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
    },
    emptyCartSubText: {
      marginTop: 8,
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    cartList: {
      paddingBottom: 20,
    },
    itemCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: theme.border,
    },
    itemCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    itemName: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
      flex: 1,
      marginRight: 10,
    },
    itemRestaurant: {
      color: theme.textSecondary,
      fontSize: 13,
      marginBottom: 10,
    },
    itemPrice: {
      fontSize: 15,
      color: theme.text,
      marginBottom: 12,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: theme.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityButtonText: {
      fontSize: 18,
      color: theme.primary,
      fontWeight: '700',
    },
    quantityValue: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginHorizontal: 12,
    },
    summaryCard: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 20,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    summaryLabel: {
      color: theme.textSecondary,
      fontSize: 15,
    },
    summaryValue: {
      color: theme.text,
      fontSize: 15,
      fontWeight: '700',
    },
    tipRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
    },
    tipInput: {
      backgroundColor: theme.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      color: theme.text,
      height: 48,
      paddingHorizontal: 14,
      marginTop: 8,
    },
    tipButton: {
      marginLeft: 12,
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 18,
    },
    tipButtonText: {
      color: theme.surface,
      fontWeight: '700',
    },
    totalRow: {
      marginBottom: 20,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: '900',
      color: theme.primary,
    },
    clearButton: {
      marginTop: 14,
      alignItems: 'center',
    },
    clearButtonText: {
      color: theme.error,
      fontSize: 14,
      fontWeight: '700',
    },
  });
