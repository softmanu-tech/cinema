import axios from 'axios';
import dotenv from 'dotenv';
import MpesaPayment from '../models/paymentModel.js';
import { createTransaction, updateTransactionStatus } from './walletService.js';

dotenv.config();

// M-Pesa configuration
const MPESA_CONFIG = {
  CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
  PASSKEY: process.env.MPESA_PASSKEY,
  SHORTCODE: process.env.MPESA_SHORTCODE,
  CALLBACK_URL: process.env.MPESA_CALLBACK_URL
};

/**
 * Get M-Pesa access token
 * @returns {Promise<string>} - Access token
 */
const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${MPESA_CONFIG.CONSUMER_KEY}:${MPESA_CONFIG.CONSUMER_SECRET}`).toString('base64');
    
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting M-Pesa access token:', error);
    throw new Error('Failed to get M-Pesa access token');
  }
};

/**
 * Generate M-Pesa password
 * @returns {string} - Generated password
 */
const generatePassword = () => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(`${MPESA_CONFIG.SHORTCODE}${MPESA_CONFIG.PASSKEY}${timestamp}`).toString('base64');
  return password;
};

/**
 * Initiate M-Pesa payment
 * @param {Object} request - Payment request
 * @param {string} request.phoneNumber - Customer phone number
 * @param {number} request.amount - Payment amount
 * @param {string} request.reference - Payment reference
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Payment response
 */
export const initiateMpesaPayment = async (request, userId) => {
  try {
    const { phoneNumber, amount, reference } = request;
    
    // Format phone number (remove leading 0 or +254)
    let formattedPhone = phoneNumber.replace(/^0|^\+254/, '');
    // Add 254 prefix if not present
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = `254${formattedPhone}`;
    }
    
    // Get access token
    const accessToken = await getAccessToken();
    
    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    
    // Generate password
    const password = generatePassword();
    
    // Prepare request body
    const requestBody = {
      BusinessShortCode: MPESA_CONFIG.SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: MPESA_CONFIG.SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: MPESA_CONFIG.CALLBACK_URL,
      AccountReference: reference,
      TransactionDesc: `Payment for ${reference}`
    };
    
    // Make API request
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Save payment record
    const payment = await MpesaPayment.create({
      userId,
      phoneNumber: formattedPhone,
      amount,
      reference,
      merchantRequestId: response.data.MerchantRequestID,
      checkoutRequestId: response.data.CheckoutRequestID,
      status: 'pending'
    });
    
    return {
      ...response.data,
      paymentId: payment._id
    };
  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error);
    throw new Error('Failed to initiate M-Pesa payment');
  }
};

/**
 * Check payment status
 * @param {string} checkoutRequestId - Checkout request ID
 * @returns {Promise<Object>} - Payment status
 */
export const checkPaymentStatus = async (checkoutRequestId) => {
  try {
    const payment = await MpesaPayment.findOne({ checkoutRequestId });
    
    if (!payment) {
      return {
        status: 'failed',
        message: 'Payment not found'
      };
    }
    
    return {
      status: payment.status === 'completed' ? 'completed' : 
              payment.status === 'failed' ? 'failed' : 'pending',
      message: payment.resultDesc || 'Payment is being processed'
    };
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw new Error('Failed to check payment status');
  }
};

/**
 * Process M-Pesa callback
 * @param {Object} callbackData - Callback data from M-Pesa
 * @returns {Promise<Object>} - Processed payment
 */
export const processMpesaCallback = async (callbackData) => {
  try {
    const { Body } = callbackData;
    const { stkCallback } = Body;
    
    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc
    } = stkCallback;
    
    // Find the payment
    const payment = await MpesaPayment.findOne({ checkoutRequestId: CheckoutRequestID });
    
    if (!payment) {
      throw new Error('Payment not found');
    }
    
    // Update payment details
    payment.resultCode = ResultCode;
    payment.resultDesc = ResultDesc;
    
    // If payment was successful
    if (ResultCode === 0) {
      // Extract metadata
      const metadata = stkCallback.CallbackMetadata.Item;
      const mpesaReceiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber').Value;
      
      payment.mpesaReceiptNumber = mpesaReceiptNumber;
      payment.status = 'completed';
      
      // Create a deposit transaction
      const transaction = await createTransaction(
        payment.userId,
        payment.amount,
        'deposit',
        payment.reference,
        `M-Pesa payment: ${mpesaReceiptNumber}`
      );
      
      // Update transaction status to completed
      await updateTransactionStatus(payment.userId, transaction._id, 'completed');
      
      // Link transaction to payment
      payment.transactionId = transaction._id;
    } else {
      payment.status = 'failed';
    }
    
    await payment.save();
    
    return payment;
  } catch (error) {
    console.error('Error processing M-Pesa callback:', error);
    throw new Error('Failed to process M-Pesa callback');
  }
};

/**
 * Initiate refund
 * @param {string} transactionId - Original transaction ID
 * @param {number} amount - Refund amount
 * @param {string} reason - Refund reason
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Refund result
 */
export const initiateRefund = async (transactionId, amount, reason, userId) => {
  try {
    // In a real implementation, this would call the M-Pesa API to process the refund
    // For now, we'll simulate a successful refund
    
    // Generate a reference
    const reference = `REF-${Date.now()}`;
    
    // Create a refund transaction
    const transaction = await createTransaction(
      userId,
      amount,
      'refund',
      reference,
      reason
    );
    
    // Complete the refund transaction
    await updateTransactionStatus(userId, transaction._id, 'completed');
    
    return {
      success: true,
      reference,
      message: 'Refund processed successfully',
      transaction
    };
  } catch (error) {
    console.error('Error initiating refund:', error);
    throw new Error('Failed to initiate refund');
  }
};