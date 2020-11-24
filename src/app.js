// Node Packages
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Routes
const userRoutes = require('./routes/users.routes');

// Utils
const AppError = require('./utils/appError');

//Controllers
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

if (process.env.ENVIRONMENT === 'development') {
  app.use(morgan('dev'));
}
app.use(
  '/',
  rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Maximo de peticiones, intenta de nuevo en una hora',
  })
);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '20kb' }));

// Routes Availables
app.use('/api/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`The path ${req.originalUrl} does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
