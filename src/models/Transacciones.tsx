export interface Transacciones {
  id: string;
  type: 'Depósito' | 'Retiro' | 'Transferencia';
  amount: number;
  description: string;
}