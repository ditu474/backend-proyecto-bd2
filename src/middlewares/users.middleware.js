const { body } = require('express-validator');

const userMiddleware = {};

userMiddleware.login = [
  body('email').isEmail().withMessage('You must send a correct email').bail(),
  body('typeOfUser')
    .not()
    .isEmpty()
    .withMessage('The key typeOfUser is empty')
    .bail()
    .trim()
    .isIn(['estudiante', 'docente', 'empleado'])
    .withMessage('The value of typeOfUser must be estudiante or docente or empleado'),
];

module.exports = userMiddleware;
