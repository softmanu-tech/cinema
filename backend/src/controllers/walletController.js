import * as walletService from '../services/walletService.js';

/**
 * Get user wallet
 * @route GET /api/wallets
 * @access Private
 */
export const getWallet = async (req, res) => {
  try {
    const wallet = await walletService.getUserWallet(req.user._id);
    
    res.json({
      success: true,
      wallet: {
        id: wallet._id,
        userId: wallet.userId,
        balance: wallet.balance,
        transactions: wallet.transactions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Create a transaction
 * @route POST /api/wallets/transactions
 * @access Private
 */
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, reference, description } = req.body;
    
    // Validate transaction type
    if (!['deposit', 'withdrawal', 'refund'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction type'
      });
    }
    
    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }
    
    const transaction = await walletService.createTransaction(
      req.user._id,
      amount,
      type,
      reference,
      description
    );
    
    res.status(201).json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update transaction status
 * @route PUT /api/wallets/transactions/:id
 * @access Private
 */
export const updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    if (!['pending', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const transaction = await walletService.updateTransactionStatus(
      req.user._id,
      req.params.id,
      status
    );
    
    res.json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Process a refund
 * @route POST /api/wallets/refund
 * @access Private
 */
export const processRefund = async (req, res) => {
  try {
    const { amount, reference, description } = req.body;
    
    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }
    
    const transaction = await walletService.processRefund(
      req.user._id,
      amount,
      reference,
      description
    );
    
    res.status(201).json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};