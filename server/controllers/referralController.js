const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const Referral = require('../models/referrerModel');
const User = require('../models/userModel');
const Email = require('../util/email');

exports.getAllReferrals = catchAsync(async (req, res, next) => {
  const referrals = await Referral.find();

  res.status(200).json({
    status: 'success',
    data: {
      referrals,
    },
  });
});

exports.approveReferral = catchAsync(async (req, res, next) => {
  // Get Referal
  const referral = await Referral.findOne({ _id: req.params.id });

  // Get referrer
  const referrer = await User.findOne({ email: referral.email });

  // Get Referree
  const referree = await User.findById(referral.user);

  // Check if referrer and referree are verified;
  if (referrer.IdVerified === 'unverified') {
    await new Email(referrer).sendAskReferrerToVerify();
    return next(new AppError('Referrer is not verified yet', 401));
  }

  if (referrer.IdVerified === 'unverified') {
    await new Email(referree).sendAskReferreeToVerify();
    return next(new AppError('Referred player has not verified their account yet', 401));
  }

  // Credit referrer with 300 bonus and set bonusMin to 50
  referrer.bonusBalance += process.env.REFERRAL_BONUS * 1;
  referrer.bonusMin = process.env.REFERRAL_BONUS_MIN * 1;
  referrer.bonusDebitCount = 0;
  referrer.bonusPlayTarget = 50;
  await referrer.save({ validateBeforeSave: false });

  // Mark Referral status to true
  referral.status = true;
  await referral.save();

  await new Email(referrer).sendReferralBonusCreditAlert();

  res.status(200).json({
    status: 'success',
    message: `Referral aprroved successfully`,
  });
});

exports.deleteReferral = catchAsync(async (req, res, next) => {
  await Referral.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});
