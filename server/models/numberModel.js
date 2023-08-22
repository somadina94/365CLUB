const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema(
  {
    predicted: {
      type: Number,
      min: 1,
      max: 6,
    },
    result: {
      type: Number,
      min: 1,
      max: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    stake: {
      type: Number,
      required: [true, 'You must stake atleast 1 credit to get play'],
      min: 1,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Dice roll must belong to a player'],
    },
    status: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Numbers = mongoose.model('Numbers', numberSchema);

module.exports = Numbers;
