import * as mpesaService from '../services/mpesaService.js';

/**
 * Initiate M-Pesa payment
 * @route POST /api/payments/mpesa
 * @access Private
 */
export const initiateMpesaPayment = async (req, res) => {
  try {
    const { phoneNumber, amount, reference } = req.body;
    
    // Validate request
    if (!phoneNumber || !amount || !reference) {
      return res.status(400).json({
        success: false,
        message: 'Phone number, amount, and reference are required'
      });
    }
    
    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }
    
    const response = await mpesaService.initiateMpesaPayment(
      { phoneNumber, amount, reference },
      req.user._id
    );
    
    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Check payment status
 * @route GET /api/payments/mpesa/status/:checkoutRequestId
 * @access Private
 */
export const checkPaymentStatus = async (req, res) => {
  try {
    const { checkoutRequestId } = req.params;
    
    const status = await mpesaService.checkPaymentStatus(checkoutRequestId);
    
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * M-Pesa callback
 * @route POST /api/payments/mpesa/callback
 * @access Public
 */
export const mpesaCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    
    // Process the callback
    await mpesaService.processMpesaCallback(callbackData);
    
    // Respond to M-Pesa
    res.json({
      ResultCode: 0,
      ResultDesc: 'Callback processed successfully'
    });
  } catch (error) {
    console.error('Error processing M-Pesa callback:', error);
    
    // Still respond with success to M-Pesa
    res.json({
      ResultCode: 0,
      ResultDesc: 'Callback received'
    });
  }
};

/**
 * Initiate refund
 * @route POST /api/payments/refund
 * @access Private
 */
export const initiateRefund = async (req, res) => {
  try {
    const { transactionId, amount, reason } = req.body;
    
    // Validate request
    if (!transactionId || !amount || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID, amount, and reason are required'
      });
    }
    
    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }
    
    const result = await mpesaService.initiateRefund(
      transactionId,
      amount,
      reason,
      req.user._id
    );
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};