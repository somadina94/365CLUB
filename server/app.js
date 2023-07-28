const express = require('express');
const cors = require('cors');
const AppError = require('./util/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const diceRouter = require('./routes/diceRoutes');
const withdrawRouter = require('./routes/withdrawRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const paymentController = require('./controllers/paymentController');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(helmet());

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this ip address, try again in 1hour.',
});
app.use('/api', limiter);

app.use(express.json());

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.webhookResponse
);

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(compression());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/dice', diceRouter);
app.use('/api/v1/withdraw', withdrawRouter);
app.use('/api/v1/payment', paymentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
