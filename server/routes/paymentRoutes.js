const express = require('express');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.use(authController.protect);

router.post('/membership-checkout', paymentController.createMembershipCheckout);
router.post('/topup-checkout', paymentController.createTopupCheckout);

module.exports = router;
