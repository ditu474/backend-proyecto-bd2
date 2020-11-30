const { param } = require('express-validator');

const qrMiddleware = {};

qrMiddleware.validateId = [
  param('id').isMongoId().withMessage('El parametro debe ser una ID de mongo valida'),
];

module.exports = qrMiddleware;
