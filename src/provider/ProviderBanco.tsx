import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { Plantilla } from '../models/Plantilla';
import { Transacciones } from '../models/Transacciones';
import { ContextBanco, BancoContextType } from '../context/ContextoBanco';

const ProviderBanco = ({ children }: Plantilla) => {
  const [balance, setBalance] = useState(10000);
  const [transactions, setTransactions] = useState<Transacciones[]>([
    { id: '1', type: 'Depósito', amount: 1000, description: 'Depósito de L.1000' },
    { id: '2', type: 'Retiro', amount: 200, description: 'Retiro de L.200' },
  ]);

  const deposit = (amount: number) => {
    if (amount <= 0) {
      Alert.alert('Error', 'Ingrese un monto válido');
      return;
    }
    setBalance(prev => prev + amount);
    const newTransaction: Transacciones = {
      id: Date.now().toString(),
      type: 'Depósito',
      amount,
      description: `Depósito de L.${amount}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const withdraw = (amount: number) => {
    if (amount <= 0) {
      Alert.alert('Error', 'Ingrese un monto válido');
      return false;
    }
    if (amount > balance) {
      Alert.alert('Error', 'No cuenta con el saldo suficiente para este retiro');
      return false;
    }
    setBalance(prev => prev - amount);
    const newTransaction: Transacciones = {
      id: Date.now().toString(),
      type: 'Retiro',
      amount,
      description: `Retiro de L.${amount}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
    Alert.alert('Éxito', 'Retiro realizado correctamente');
    return true;
  };

  const transfer = (accountNumber: string, recipientName: string, amount: string) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Ingrese un monto válido');
      return false;
    }
    if (numAmount > balance) {
      Alert.alert('Error', 'No cuenta con el saldo para completar la transacción');
      return false;
    }
    setBalance(prev => prev - numAmount);
    const newTransaction: Transacciones = {
      id: Date.now().toString(),
      type: 'Transferencia',
      amount: numAmount,
      description: `Transferencia a ${recipientName} (Cuenta: ${accountNumber}) por L.${numAmount}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
    Alert.alert('Éxito', 'Transferencia realizada correctamente');
    return true;
  };

  const value: BancoContextType = {
    balance,
    transactions,
    deposit,
    withdraw,
    transfer,
  };

  return (
    <ContextBanco.Provider value={value}>
      {children}
    </ContextBanco.Provider>
  );
};

export default ProviderBanco;

export const useContextBanco = () => {
  const context = useContext(ContextBanco);
  if (!context) {
    throw new Error('useContextBanco debe usarse dentro de ProviderBanco');
  }
  return context;
};