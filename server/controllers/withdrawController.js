const Withdraw = require('../models/withdrawModel');
const User = require('../models/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const ethAddress = require('ethereum-address');
const btcAddress = require('bitcoin-address-validation');
const Email = require('../util/email');

exports.createWithdraw = catchAsync(async (req, res, next) => {
  // Check if wallet addresses are valid
  //---------------------------ETH--------------------------------
  const walletAddressType = req.body.walletType;
  const walletAddressInput = req.body.walletAddress;
  if (walletAddressType === 'ETHEREUM') {
    if (!ethAddress.isAddress(walletAddressInput)) {
      return next(new AppError('Invalid Ethereum wallet address', 403));
    }
  }
  //---------------------------BTC---------------------------------
  if (walletAddressType === 'BITCOIN') {
    const result = btcAddress.validate(walletAddressInput);
    if (!result) {
      return next(new AppError('Invalid BITCOIN wallet', 403));
    }
  }

  // Add user to req.body
  req.body.user = req.user._id;

  // Get amount and check is its less than min allowed.
  const amount = req.body.amount * 1;
  if (amount < 5) {
    return next(new AppError('Minimium withdrawal limit is $5', 401));
  }

  // Get user
  const user = await User.findById(req.user._id);

  // Get request balance choice
  const { account } = req.body;

  // Check if the user manipulated the UI
  if (!account === 'Main balance' || !account === 'Bonus Balance') {
    return next(new AppError('Unrecognized choice of balance,', 403));
  }

  // Check if bonus balance was chosen and validate accordingly
  if (account === 'Bonus balance' && user.bonusDebitCount < user.bonusPlayTarget) {
    return next(
      new AppError(
        `You have only played ${user.bonusDebitCount} times with your current bonus.
         The target set for your current bonus is ${user.bonusPlayTarget}. 
         Play ${user.bonusPlayTarget - user.bonusDebitCount} times more to 
         be able to withdraw from your bonus.`
      )
    );
  }

  // Check if user have enough balance
  if (account === 'Bonus balance' && user.bonusBalance < amount) {
    return next(new AppError('Insufficient bonus credit', 403));
  }

  if (account === 'Main balance' && user.balance < amount) {
    return next(new AppError('Insufficient credit', 403));
  }

  // Check balance choice types and debit accordingly
  if (account === 'Bonus balance') {
    const newBalance = user.bonusBalance - amount;
    user.bonusBalance = newBalance;
  }

  if (account === 'Main balance') {
    const newBalance = user.balance - amount;
    user.balance = newBalance;
  }

  // Create new Withdraw Object
  const withdrawal = await Withdraw.create(req.body);

  if (!withdrawal) {
    return next(
      new AppError(
        'Something went wrong with placing your withdrawal request, please make sure you followed the process instruction and try again'
      )
    );
  }

  await user.save({ validateBeforeSave: false });
  const adminEmail = {
    email: process.env.ADMIN_EMAIL,
    name: 'Admin 365dice',
  };

  await new Email(adminEmail).sendAdminWithdrawAlert();

  // Send response
  res.status(201).json({
    status: 'success',
    message:
      'Withdrawal request placed successfully. We will credit your account as soon as possible',
    data: {
      withdrawal,
    },
  });
});

exports.getAllWithdrawalRequests = catchAsync(async (req, res, next) => {
  const withdrawalRequests = await Withdraw.find({ status: 'processing' });

  res.status(200).json({
    status: 'success',
    data: {
      withdrawalRequests,
    },
  });
});

exports.getUserWithdrawalRequests = catchAsync(async (req, res, next) => {
  const withdrawalRequests = await Withdraw.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      withdrawalRequests,
    },
  });
});
