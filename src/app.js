// Node Packages
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');

// Routes
const testRoutes = require('./routes/test.routes');
const userRoutes = require('./routes/users.routes');

// Utils
const AppError = require('./utils/appError');

//Controllers
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

if (process.env.ENVIRONMENT === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '10kb' }));
app.use(
  '/',
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Maximum requests, try again in an hour',
  })
);

// Routes Availables

app.use('/', testRoutes);
app.use('/login', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`The path ${req.originalUrl} does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
