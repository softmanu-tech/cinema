import { Wallet, Transaction } from '../models/walletModel.js';
import mongoose from 'mongoose';

/**
 * Get or create a user's wallet
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User wallet
 */
export const getUserWallet = async (userId) => {
  let wallet = await Wallet.findOne({ userId });
  
  if (!wallet) {
    wallet = await Wallet.create({
      userId,
      balance: 0,
      transactions: []
    });
  }
  
  return wallet;
};

/**
 * Create a new transaction
 * @param {string} userId - User ID
 * @param {number} amount - Transaction amount
 * @param {'deposit' | 'withdrawal' | 'refund'} type - Transaction type
 * @param {string} [reference] - External reference (optional)
 * @param {string} [description] - Transaction description (optional)
 * @returns {Promise<Object>} - Created transaction
 */
export const createTransaction = async (userId, amount, type, reference, description) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const wallet = await getUserWallet(userId);
    
    const transaction = {
      userId,
      amount,
      type,
      status: 'pending',
      reference,
      description
    };
    
    wallet.transactions.push(transaction);
    await wallet.save({ session });
    
    await session.commitTransaction();
    return wallet.transactions[wallet.transactions.length - 1];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/**
 * Update transaction status
 * @param {string} userId - User ID
 * @param {string} transactionId - Transaction ID
 * @param {'pending' | 'completed' | 'failed'} status - New status
 * @returns {Promise<Object>} - Updated transaction
 */
export const updateTransactionStatus = async (userId, transactionId, status) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const wallet = await Wallet.findOne({ userId });
    
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    
    const transaction = wallet.transactions.id(transactionId);
    
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    
    transaction.status = status;
    
    // Update wallet balance if transaction is completed
    if (status === 'completed') {
      if (transaction.type === 'deposit' || transaction.type === 'refund') {
        wallet.balance += transaction.amount;
      } else if (transaction.type === 'withdrawal') {
        if (wallet.balance < transaction.amount) {
          throw new Error('Insufficient funds');
        }
        wallet.balance -= transaction.amount;
      }
    }
    
    await wallet.save({ session });
    
    await session.commitTransaction();
    return transaction;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/**
 * Process a refund
 * @param {string} userId - User ID
 * @param {number} amount - Refund amount
 * @param {string} reference - Original transaction reference
 * @param {string} description - Refund description
 * @returns {Promise<Object>} - Refund transaction
 */
export const processRefund = async (userId, amount, reference, description) => {
  // Create a refund transaction
  const transaction = await createTransaction(
    userId,
    amount,
    'refund',
    reference,
    description
  );
  
  // Complete the refund transaction
  await updateTransactionStatus(userId, transaction._id, 'completed');
  
  return transaction;
};