/**
 * @typedef {Object} WalletTransaction
 * @property {string} id - Transaction ID
 * @property {string} userId - User ID
 * @property {number} amount - Transaction amount
 * @property {'deposit' | 'withdrawal' | 'refund'} type - Transaction type
 * @property {'pending' | 'completed' | 'failed'} status - Transaction status
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string} [reference] - External reference (optional)
 * @property {string} [description] - Transaction description (optional)
 */

/**
 * @typedef {Object} Wallet
 * @property {string} id - Wallet ID
 * @property {string} userId - User ID
 * @property {number} balance - Current balance
 * @property {WalletTransaction[]} transactions - List of transactions
 */

export {};