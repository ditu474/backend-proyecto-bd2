// Node Packages
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Routes
const userRoutes = require('./routes/users.routes');
const formRoutes = require('./routes/form.routes');
const qrRoutes = require('./routes/qr.routes');

// Utils
const AppError = require('./utils/appError');

//Controllers
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

if (process.env.ENVIRONMENT === 'development') {
  const morgan = require('morgan');
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
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'ok',
    documentation: 'https://app.swaggerhub.com/apis-docs/ditu474/covidpoliapi/1.0.0',
  });
});
app.use('/api/user', userRoutes);
app.use('/api/form', formRoutes);
app.use('/api/qr', qrRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`The path ${req.originalUrl} does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
