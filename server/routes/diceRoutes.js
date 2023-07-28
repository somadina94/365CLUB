const express = require("express");
const authController = require("../controllers/authController");
const diceController = require("../controllers/diceController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(diceController.playDice)
  .get(diceController.getPlayerHistory);

router.post("/bonus-play", diceController.playWithBonus);

module.exports = router;
