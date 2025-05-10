/**
 * @typedef {Object} MpesaPaymentRequest
 * @property {string} phoneNumber - Customer phone number
 * @property {number} amount - Payment amount
 * @property {string} reference - Payment reference
 */

/**
 * @typedef {Object} MpesaPaymentResponse
 * @property {string} MerchantRequestID - Merchant request ID
 * @property {string} CheckoutRequestID - Checkout request ID
 * @property {string} ResponseCode - Response code
 * @property {string} ResponseDescription - Response description
 * @property {string} CustomerMessage - Customer message
 */

/**
 * @typedef {Object} MpesaCallback
 * @property {string} MerchantRequestID - Merchant request ID
 * @property {string} CheckoutRequestID - Checkout request ID
 * @property {number} ResultCode - Result code (0 for success)
 * @property {string} ResultDesc - Result description
 * @property {Object} [CallbackMetadata] - Callback metadata (present on success)
 */

export {};