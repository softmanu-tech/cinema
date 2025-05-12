import mongoose from 'mongoose';

const mpesaPaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  merchantRequestId: {
    type: String
  },
  checkoutRequestId: {
    type: String
  },
  resultCode: {
    type: Number
  },
  resultDesc: {
    type: String
  },
  mpesaReceiptNumber: {
    type: String
  },
  status: {
    type: String,
    enum: ['initiated', 'pending', 'completed', 'failed'],
    default: 'initiated'
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }
}, {
  timestamps: true
});

const MpesaPayment = mongoose.model('MpesaPayment', mpesaPaymentSchema);

export default MpesaPayment;