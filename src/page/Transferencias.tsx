import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard } from 'react-native';
import { useContextBanco } from '../provider/ProviderBanco';

const Transferencias = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { transfer } = useContextBanco();

  const handleTransfer = () => {
    if (!account || !name || !amount) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    transfer(account, name, amount);
    setAccount('');
    setName('');
    setAmount('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número de cuenta</Text>
      <TextInput
        style={styles.input}
        value={account}
        onChangeText={setAccount}
        keyboardType="numeric"
        placeholder="No. Cuenta"
      />
      <Text style={styles.label}>Nombre del destinatario</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Destinatario"
      />
      <Text style={styles.label}>Monto a transferir</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Ej. 500"
      />
      <Button title="Transferir" onPress={handleTransfer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 16 },
});

export default Transferencias;