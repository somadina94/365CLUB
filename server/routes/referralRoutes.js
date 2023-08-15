const express = require('express');
const referralController = require('../controllers/referralController');

const router = express.Router();

router.get('/', referralController.getAllReferrals);

router.patch('/approveReferral/:id', referralController.approveReferral);

router.delete('/:id', referralController.deleteReferral);

module.exports = router;
