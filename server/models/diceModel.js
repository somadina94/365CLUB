const mongoose = require("mongoose");

const diceSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      min: 1,
      max: 6,
      required: [true, "Dice roll must have a score"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    stake: {
      type: Number,
      required: [true, "You must stake atleast 1 credit to get play"],
      min: 1,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Dice roll must belong to a player"],
    },
    status: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Dice = mongoose.model("Dice", diceSchema);

module.exports = Dice;
