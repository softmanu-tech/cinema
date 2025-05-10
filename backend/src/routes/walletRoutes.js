import express from 'express';
import {
  getWallet,
  createTransaction,
  updateTransactionStatus,
  processRefund
} from '../controllers/walletController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all wallet routes
router.use(protect);

// Get user wallet
router.get('/', getWallet);

// Create a transaction
router.post('/transactions', createTransaction);

// Update transaction status
router.put('/transactions/:id', updateTransactionStatus);

// Process a refund
router.post('/refund', processRefund);

export default router;