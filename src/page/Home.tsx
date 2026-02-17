import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { useContextBanco } from '../provider/ProviderBanco';

const Home = () => {
  const { balance, transactions, deposit, withdraw } = useContextBanco();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Ingrese un monto válido');
      return;
    }
    deposit(amount);
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Ingrese un monto válido');
      return;
    }
    withdraw(amount);
    setWithdrawAmount('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bienvenido Usuario XY</Text>
      <Text style={styles.balance}>Saldo Actual: L.{balance}</Text>

      <Text style={styles.sectionTitle}>Depositar</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto a depositar"
        keyboardType="numeric"
        value={depositAmount}
        onChangeText={setDepositAmount}
      />
      <Button title="Depositar Saldo" onPress={handleDeposit} />

      <Text style={styles.sectionTitle}>Retirar</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto a retirar"
        keyboardType="numeric"
        value={withdrawAmount}
        onChangeText={setWithdrawAmount}
      />
      <Button title="Retirar Saldo" onPress={handleWithdraw} />

      <Text style={styles.subtitle}>Últimas transacciones:</Text>
      <FlatList
        data={transactions.slice(0, 5)}
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
  greeting: { fontSize: 24, marginBottom: 10 },
  balance: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 18, marginTop: 15, marginBottom: 5, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 16, marginBottom: 10 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  transactionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default Home;