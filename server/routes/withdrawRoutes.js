const express = require('express');
const authController = require('../controllers/authController');
const withdrawController = require('../controllers/withdrawController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(withdrawController.createWithdraw)
  .get(withdrawController.getAllWithdrawalRequests);

router.get('/player-withdraws', withdrawController.getUserWithdrawalRequests);

module.exports = router;
