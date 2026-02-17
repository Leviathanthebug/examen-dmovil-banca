import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useContextBanco } from '../provider/ProviderBanco';

const Historial = () => {
  const { transactions } = useContextBanco();

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total de Transacciones realizadas: {transactions.length}</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  transactionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default Historial;