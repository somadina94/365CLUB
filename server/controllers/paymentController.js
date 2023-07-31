const User = require('../models/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const coinbase = require('coinbase-commerce-node');
const Email = require('../util/email');

const Client = coinbase.Client;
const clientObj = Client.init(process.env.COINBASE_API_KEY);
clientObj.setRequestTimeout(10000);
const resources = coinbase.resources;
const webhook = coinbase.Webhook;

exports.createMembershipCheckout = catchAsync(async (req, res, next) => {
  const monthlyCharge = 10;
  const charge = await resources.Charge.create({
    name: '365Club membership checkout',
    description: 'Membership purchase charge',
    local_price: {
      amount: monthlyCharge,
      currency: 'USD',
    },
    pricing_type: 'fixed_price',
    metadata: {
      price: monthlyCharge,
      user: req.user._id,
      purpose: 'membership',
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      charge,
    },
  });
});

exports.createTopupCheckout = catchAsync(async (req, res, next) => {
  const amount = req.body.amount * 1;
  const charge = await resources.Charge.create({
    name: '365Club topup checkout',
    description: 'Topup account',
    local_price: {
      amount,
      currency: 'USD',
    },
    pricing_type: 'fixed_price',
    metadata: {
      price: amount,
      user: req.user._id,
      purpose: 'topup',
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      charge,
    },
  });
});

exports.webhookResponse = catchAsync(async (req, res, next) => {
  const event = webhook.verifyEventBody(
    req.rawBody,
    req.headers['x-cc-webhook-signature'],
    process.env.COINBASE_WEBHOOK_SECRET
  );

  if (event.type === 'charge:confirmed') {
    const metaData = event.data.metadata;
    const userId = metaData.user;
    const price = metaData.price;
    const purpose = metaData.purpose;
    res.sendStatus(200);

    const user = await User.findById(userId);
    // Get sub date and expiry date
    const currentDate = new Date();
    const expiryDate = currentDate.setDate(currentDate.getDate() + 30);
    const subDate = Date.now();

    const adminEmail = {
      email: process.env.ADMIN_EMAIL,
      name: 'Admin 365dice',
    };

    if (purpose === 'membership') {
      user.membership = true;
      user.subDate = subDate;
      user.subExpiryDate = expiryDate;
      await new Email(user).sendUser365SubAlert();
      await new Email(adminEmail).sendAdmin365MembershipAlert();
    }

    if (purpose === 'topup') {
      user.balance += price;
      await new Email(user).sendUserTopupAlert();
      await new Email(adminEmail).sendAdminTopupAlert();
    }
    await user.save({ validateBeforeSave: false });
  }
});
