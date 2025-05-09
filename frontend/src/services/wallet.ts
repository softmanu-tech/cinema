
import { Wallet, WalletTransaction } from "@/types/wallet";

// Mock user wallet data
const userWallets: Record<string, Wallet> = {
  "user-1": {
    id: "wallet-1",
    userId: "user-1",
    balance: 0,
    transactions: []
  }
};

export const getUserWallet = (userId: string): Wallet => {
  if (!userWallets[userId]) {
    userWallets[userId] = {
      id: `wallet-${Date.now()}`,
      userId,
      balance: 0,
      transactions: []
    };
  }
  
  return userWallets[userId];
};

export const createTransaction = (
  userId: string,
  amount: number,
  type: 'deposit' | 'withdrawal' | 'refund',
  reference?: string,
  description?: string
): WalletTransaction => {
  const wallet = getUserWallet(userId);
  const transaction: WalletTransaction = {
    id: `txn-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    amount,
    type,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reference,
    description
  };
  
  wallet.transactions.push(transaction);
  return transaction;
};

export const updateTransactionStatus = (
  userId: string,
  transactionId: string,
  status: 'pending' | 'completed' | 'failed'
): WalletTransaction | undefined => {
  const wallet = getUserWallet(userId);
  const transaction = wallet.transactions.find(t => t.id === transactionId);
  
  if (transaction) {
    transaction.status = status;
    transaction.updatedAt = new Date().toISOString();
    
    // Update wallet balance if transaction is completed
    if (status === 'completed') {
      if (transaction.type === 'deposit' || transaction.type === 'refund') {
        wallet.balance += transaction.amount;
      } else if (transaction.type === 'withdrawal') {
        wallet.balance -= transaction.amount;
      }
    }
  }
  
  return transaction;
};

export const processRefund = async (
  userId: string,
  amount: number,
  reference: string,
  description: string
): Promise<WalletTransaction> => {
  // Create a refund transaction
  const transaction = createTransaction(userId, amount, 'refund', reference, description);
  
  // Process the refund (in a real app, this might involve additional steps)
  setTimeout(() => {
    updateTransactionStatus(userId, transaction.id, 'completed');
  }, 2000);
  
  return transaction;
};
