const Numbers = require('../models/numberModel');
const User = require('../models/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const cron = require('node-cron');

exports.playNumbers = catchAsync(async (req, res, next) => {
  // Get data from body
  const predicted = req.body.predicted * 1;
  const stake = req.body.stake * 1;

  // Get User
  const user = await User.findById(req.user._id);

  // Check if user has verified their email
  if (!user.emailVerified) {
    return next(new AppError('Please verify your email to be able to play', 401));
  }

  // Check is stake is greater than players account balalnce
  if (stake > user.balance) {
    return next(
      new AppError('Insufficient balance, you have to topup your account to play', 403)
    );
  }

  // Check if stake is less than Minimium allowed
  if (stake < 1) {
    return next(new AppError('The minium stake is 1credit', 403));
  }

  // Debit user
  user.balance = user.balance - stake;

  // Play Numbers
  const result = Math.floor(Math.random() * 6) + 1;

  // If player won and credit user balance
  if (predicted === result) {
    user.balance = user.balance + stake * process.env.NUMBER_WIN_POINT;
    await user.save({ validateBeforeSave: false });
  }

  // If player lost, just save user and proceeed
  if (result !== predicted) {
    await user.save({ validateBeforeSave: false });
  }

  // Create new Number object
  const number = await Numbers.create({
    predicted,
    stake,
    result,
    status: predicted === result ? true : false,
    user: user._id,
  });

  // Generate message with regards to result status
  let message;
  if (predicted === result)
    message = `Congratulations!!! you won and your balance has been credited`;
  if (predicted !== result) message = `Sorry you lost....try again`;

  // Send response
  res.status(201).json({
    status: 'success',
    message,
    data: {
      number,
    },
  });
});

exports.playNumbersWithBonus = catchAsync(async (req, res, next) => {
  // Get data from body
  const predicted = req.body.predicted * 1;
  const stake = req.body.stake * 1;

  // Get User
  const user = await User.findById(req.user._id);

  // Check if user has verified their email
  if (!user.emailVerified) {
    return next(new AppError('Please verify your email to be able to play', 401));
  }

  // Check is stake is greater than players account balalnce
  if (stake > user.bonusBalance) {
    return next(new AppError('Insufficient bonus balance', 401));
  }

  // Check if stake is less than Minimium allowed
  if (stake < 1) {
    return next(new AppError('The minium stake is 1credit', 403));
  }

  // Debit user
  user.bonusBalance = user.bonusBalance - stake;

  // Play Numbers
  const result = Math.floor(Math.random() * 6) + 1;

  // If player won and credit user balance
  if (predicted === result) {
    user.bonusBalance = user.bonusBalance + stake * process.env.NUMBER_WIN_POINT;
    user.bonusDebitCount += 1;
    await user.save({ validateBeforeSave: false });
  }

  // If player lost, just save user and proceeed
  if (result !== predicted) {
    user.bonusDebitCount += 1;
    await user.save({ validateBeforeSave: false });
  }

  // Create new Number object
  const number = await Numbers.create({
    predicted,
    stake,
    result,
    status: predicted === result ? true : false,
    user: user._id,
  });

  // Generate message with regards to result status
  let message;
  if (predicted === result)
    message = `Congratulations!!! you won and your balance has been credited`;
  if (predicted !== result) message = `Sorry you lost....try again`;

  // Send response
  res.status(201).json({
    status: 'success',
    message,
    data: {
      number,
    },
  });
});

exports.getAllNumberPlayer = catchAsync(async (req, res, next) => {
  const numbers = await Numbers.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      numbers,
    },
  });
});

const deleteAllNumberHistory = async () => {
  try {
    const history = await Numbers.find();

    history.forEach(async (el) => await Numbers.findByIdAndDelete(el._id));
  } catch (err) {
    // console.log(err);
  }
};

cron.schedule(`0 0 * * *`, () => {
  deleteAllNumberHistory();
  // console.log('running a task every minute');
});
