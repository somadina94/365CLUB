const Dice = require('../models/diceModel');
const User = require('../models/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const cron = require('node-cron');

exports.playDice = catchAsync(async (req, res, next) => {
  // 1) Get loggedIn user
  const user = await User.findOne({ _id: req.user._id });

  if (!user.active) {
    return next(
      new AppError(
        'You are barred from playing, please contact customer support for assistance',
        401
      )
    );
  }

  // 2) Check if player has enough balance to play.
  const stake = req.body.stake * 1;
  if (user.balance < stake) {
    return next(
      new AppError('Insufficient balance, add funds to your account to play', 401)
    );
  }

  // 3) Check is stake is less than min
  if (stake < 1) {
    return next(new AppError('Minimium stake is 1credit', 401));
  }

  // 3) Check if stake is higher than max if not vip member.
  const subExpiryDate = new Date(user.subExpiryDate).getTime();
  const subDate = new Date(user.subDate).getTime();
  let month = new Date();
  month.setDate(month.getDate() + 30);
  const timestamp = month.getTime();

  if (
    (stake > user.maxStake && !user.membership) ||
    (stake > user.maxStake && subExpiryDate - subDate > timestamp)
  ) {
    return next(new AppError('Upgrade to 365club to stake higher than 5 credits', 401));
  }

  // 4) Create new dice object
  const result = Math.floor(Math.random() * 6) + 1;

  // 5) Debit player if lost
  if (result === 1 || result === 2 || result === 4) {
    const newBalance = user.balance - stake * 1;
    user.balance = newBalance;
    await user.save({ validateBeforeSave: false });
  }

  // 6) Credit player if won
  if (result === 3 || result === 6 || result === 5) {
    const newBalance = user.balance + stake * 0.5;
    user.balance = newBalance;
    await user.save({ validateBeforeSave: false });
  }

  const newDice = await Dice.create({
    score: result,
    stake: req.body.stake,
    user: req.user._id,
    createdAt: Date.now(),
    status:
      result === 1
        ? false
        : result === 2
        ? false
        : result === 3
        ? true
        : result === 4
        ? false
        : result === 5
        ? true
        : result === 6
        ? true
        : '',
  });

  // 6) send back response to user
  const message = newDice.status
    ? 'Congratulations you won and your account has been credited accordingly, play again to win more!'
    : 'Sorry you lost, try again!';
  res.status(201).json({
    status: 'success',
    message,
    data: {
      newDice,
    },
  });
});

exports.playWithBonus = catchAsync(async (req, res, next) => {
  // Get user
  const user = await User.findById(req.user._id);
  // Check if email is verified
  if (!user.emailVerified) {
    return next(
      new AppError(
        'Please verify your email to play, check your inbox or spam folder',
        401
      )
    );
  }
  // Get stake
  const stake = req.body.stake * 1;
  // Check if stake is lower than user's bonus minimium
  if (stake < user.bonusMin) {
    return next(
      new AppError(
        `Your current minimium stake from bonus balance is ${user.bonusMin}`,
        401
      )
    );
  }
  // Check is stake is higher than bonus balance
  if (stake > user.bonusBalance) {
    return next(new AppError('Insufficient bonus credit', 401));
  }
  // Update user bonusDebitCount to +1
  const newDebitCount = user.bonusDebitCount + 1;
  user.bonusDebitCount = newDebitCount;
  // Debit user bonus account
  const newBonusBalance = user.bonusBalance - stake;
  user.bonusBalance = newBonusBalance;
  await user.save({ validateBeforeSave: false });
  // Roll the dice
  const result = Math.floor(Math.random() * 6) + 1;
  const newDice = await Dice.create({
    score: result,
    stake,
    user: user._id,
    createdAt: Date.now(),
    status:
      result === 1
        ? false
        : result === 2
        ? false
        : result === 3
        ? true
        : result === 4
        ? false
        : result === 5
        ? true
        : result === 6
        ? true
        : '',
  });
  // Update user if he won
  if (result === 3 || result === 6 || result === 5) {
    const newBonusBalance = user.bonusBalance + stake * 1.5;
    user.bonusBalance = newBonusBalance;
    await user.save({ validateBeforeSave: false });
  }
  // Generate success and fail message
  const message = newDice.status
    ? 'Congratulations you won and your account has been credited accordingly, play again to win more!'
    : 'Sorry you lost, try again!';
  // Send response
  res.status(200).json({
    status: 'success',
    message,
    data: {
      newDice,
    },
  });
});

exports.getPlayerHistory = catchAsync(async (req, res, next) => {
  const history = await Dice.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      history,
    },
  });
});

const deleteHistory = async () => {
  const history = await Dice.find();

  history.forEach(async (el) => await Dice.findByIdAndDelete(el._id));
};

cron.schedule(`0 0 * * *`, () => {
  deleteHistory();
  console.log('running a task every minute');
});
