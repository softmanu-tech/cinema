import express from 'express';
import {
  initiateMpesaPayment,
  checkPaymentStatus,
  mpesaCallback,
  initiateRefund
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Initiate M-Pesa payment
router.post('/mpesa', protect, initiateMpesaPayment);

// Check payment status
router.get('/mpesa/status/:checkoutRequestId', protect, checkPaymentStatus);

// M-Pesa callback (public route)
router.post('/mpesa/callback', mpesaCallback);

// Initiate refund
router.post('/refund', protect, initiateRefund);

export default router;