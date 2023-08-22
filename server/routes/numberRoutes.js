const express = require('express');
const numberController = require('../controllers/numberController');
const authController = require('../controllers/authController');
const app = require('../app');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(numberController.playNumbers)
  .get(numberController.getAllNumberPlayer);

router.post('/play-with-bonus', numberController.playNumbersWithBonus);

module.exports = router;
