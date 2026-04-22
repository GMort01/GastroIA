import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';
import { useHistory } from '../context/HistoryContext';

export default function HistoryScreen() {
  const navigation = useNavigation();
  const { theme } = useSettings();
  const { purchaseHistory = [] } = useHistory();
  const styles = getStyles(theme);

  const totalSpent = purchaseHistory.reduce((sum, purchase) => sum + purchase.total, 0);
  const averageTip = purchaseHistory.length > 0
    ? Math.round(purchaseHistory.reduce((sum, purchase) => sum + purchase.tip, 0) / purchaseHistory.length)
    : 0;
  const ordersCount = purchaseHistory.length;

  const categoryCounts = purchaseHistory.reduce((counts, purchase) => {
    purchase.items.forEach((item) => {
      const category = item.categoria || 'Otros';
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, {});

  const mostCommonCategory = Object.keys(categoryCounts).reduce((best, category) => {
    if (!best || categoryCounts[category] > categoryCounts[best]) {
      return category;
    }
    return best;
  }, null);

  const renderPurchase = ({ item }) => (
    <View style={styles.purchaseCard}>
      <Text style={styles.purchaseDate}>{item.date}</Text>
      <FlatList
        data={item.items}
        keyExtractor={(purchaseItem, index) => `${purchaseItem.id || purchaseItem.nombre}-${index}`}
        renderItem={({ item: purchaseItem }) => (
          <Text style={styles.purchaseItem}>
            {purchaseItem.nombre} x{purchaseItem.quantity} - ${purchaseItem.precio * purchaseItem.quantity}
          </Text>
        )}
      />
      <View style={styles.purchaseSummary}>
        <Text style={styles.purchaseText}>Subtotal: ${item.subtotal}</Text>
        <Text style={styles.purchaseText}>Propina: ${item.tip}</Text>
        <Text style={styles.purchaseTotal}>Total: ${item.total}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={theme.primary} />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Historial de Compras</Text>

        {ordersCount > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Pedidos totales: {ordersCount}</Text>
            <Text style={styles.summaryLabel}>Gasto total: ${totalSpent}</Text>
            <Text style={styles.summaryLabel}>Propina promedio: ${averageTip}</Text>
            <Text style={styles.summaryLabel}>Categoría favorita: {mostCommonCategory || 'N/A'}</Text>
          </View>
        )}

        {purchaseHistory.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={48} color={theme.textSecondary} />
            <Text style={styles.emptyText}>Aún no tienes compras anteriores.</Text>
          </View>
        ) : (
          <FlatList
            data={purchaseHistory}
            keyExtractor={(item) => item.id}
            renderItem={renderPurchase}
            contentContainerStyle={styles.historyList}
            showsVerticalScrollIndicator={false}
          />
        )}
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
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 20,
    },
    historyList: {
      paddingBottom: 20,
    },
    summaryCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    summaryLabel: {
      color: theme.text,
      fontSize: 15,
      marginBottom: 6,
    },
    purchaseCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    purchaseDate: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.primary,
      marginBottom: 10,
    },
    purchaseItem: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 4,
    },
    purchaseSummary: {
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 10,
    },
    purchaseText: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 4,
    },
    purchaseTotal: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.primary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      marginTop: 20,
      fontSize: 18,
      color: theme.textSecondary,
      textAlign: 'center',
    },
  });