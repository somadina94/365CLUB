const mongoose = require('mongoose');

const referrerSchema = new mongoose.Schema(
  {
    email: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Referral = mongoose.model('Referral', referrerSchema);

module.exports = Referral;
