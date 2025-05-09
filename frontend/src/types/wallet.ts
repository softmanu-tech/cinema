
export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  reference?: string;
  description?: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  transactions: WalletTransaction[];
}
