const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      required: [true, 'Please choose the account you want to withdraw from'],
    },
    walletType: {
      type: String,
      required: [true, 'Please choose Crypto service to receive your funds'],
    },
    walletAddress: {
      type: String,
      required: [
        true,
        'Please insert your wallet address according to your selected Crypto service',
      ],
    },
    amount: {
      type: Number,
      required: [true, 'Please enter the amount you wish to withdraw'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['processing', 'completed'],
      default: 'processing',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Withdrawal request must belong to a player'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;
