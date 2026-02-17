import { createContext } from 'react';
import { Transacciones } from '../models/Transacciones';

export interface BancoContextType {
  balance: number;
  transactions: Transacciones[];
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;
  transfer: (accountNumber: string, recipientName: string, amount: string) => boolean;
}

export const ContextBanco = createContext<BancoContextType>({
  balance: 10000,
  transactions: [],
  deposit: () => {},
  withdraw: () => false,
  transfer: () => false,
});