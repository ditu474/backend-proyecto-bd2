const { query, body, check } = require('express-validator');

const userMiddleware = {};

const emailQueryValidator = () =>
  query('email')
    .not()
    .isEmpty()
    .withMessage('El valor de email está vacia')
    .bail()
    .isEmail()
    .withMessage('El email enviado no es valido')
    .bail();

userMiddleware.login = [
  emailQueryValidator(),
  query('typeOfUser')
    .not()
    .isEmpty()
    .withMessage('El valor de typeOfUser está vacia')
    .bail()
    .trim()
    .isIn(['estudiante', 'docente', 'empleado'])
    .withMessage('El valor del campo typeOfUser debe ser estudiante o docente o empleado')
    .bail(),
];

userMiddleware.getFamilyInfo = [emailQueryValidator()];

userMiddleware.postFamilyInfo = [
  body('user_email')
    .isEmail()
    .withMessage("El campo de 'user_email' debe ser un email valido")
    .bail(),
  body('relatives').isArray().withMessage("El campo de 'relatives' debe ser de tipo Array").bail(),
  check('relatives.*.relation')
    .if((value, { req }) => req.body.relatives.length > 0)
    .notEmpty()
    .withMessage(
      "El campo de 'relation' dentro de 'relatives' no debe estar vacio para cada elemento"
    )
    .isString()
    .withMessage("El campo de 'relation' dentro de 'relatives' debe ser un String")
    .bail(),
  check('relatives.*.name')
    .if((value, { req }) => req.body.relatives.length > 0)
    .notEmpty()
    .withMessage("El campo de 'name' dentro de 'relatives' no debe estar vacio para cada elemento")
    .isString()
    .withMessage("El campo de 'name' dentro de 'relatives' debe ser un String")
    .bail(),
  check('relatives.*.birthday')
    .if((value, { req }) => req.body.relatives.length > 0)
    .notEmpty()
    .withMessage(
      "El campo de 'birthday' dentro de 'relatives' no debe estar vacio para cada elemento"
    )
    .isISO8601()
    .withMessage(
      "El campo de 'birthday' dentro de 'relatives' debe ser de una fecha de tipo ISO8601"
    )
    .bail(),
  check('relatives.*.gender')
    .if((value, { req }) => req.body.relatives.length > 0)
    .notEmpty()
    .withMessage(
      "El campo de 'gender' dentro de 'relatives' no debe estar vacio para cada elemento"
    )
    .isString()
    .withMessage("El campo de 'gender' dentro de 'relatives' debe ser un String")
    .bail(),
  body('childrens').isArray().withMessage("El campo de 'childrens' debe ser de tipo Array").bail(),
  check('childrens.*.birthday')
    .if((value, { req }) => req.body.childrens.length > 0)
    .notEmpty()
    .withMessage(
      "El campo de 'birthday' dentro de 'childrens' no debe estar vacio para cada elemento"
    )
    .isISO8601()
    .withMessage(
      "El campo de 'birthday' dentro de 'childrens' debe ser de una fecha de tipo ISO8601"
    )
    .bail(),
  check('childrens.*.gender')
    .if((value, { req }) => req.body.childrens.length > 0)
    .notEmpty()
    .withMessage(
      "El campo de 'gender' dentro de 'childrens' no debe estar vacio para cada elemento"
    )
    .isString()
    .withMessage("El campo de 'gender' dentro de 'childrens' debe ser un String")
    .bail(),
  check('childrens.*.study_at_home')
    .if((value, { req }) => req.body.childrens.length > 0)
    .notEmpty()
    .withMessage(
      "El campo de 'study_at_home' dentro de 'childrens' no debe estar vacio para cada elemento"
    )
    .isBoolean()
    .withMessage("El campo de 'study_at_home' dentro de 'childrens' debe ser un Booleano")
    .bail(),
  body('location').notEmpty().withMessage("El campo 'location' no debe estar vacio").bail(),
  body('location.municipality')
    .notEmpty()
    .withMessage("El valor de 'municipality' dentro de 'location' no debe estar vacia")
    .isString()
    .withMessage("El valor de 'municipality' dentro de 'location' debe ser de tipo String")
    .bail(),
  body('location.department')
    .notEmpty()
    .withMessage("El valor de 'department' dentro de 'location' no debe estar vacia")
    .isString()
    .withMessage("El valor de 'department' dentro de 'location' debe ser de tipo String")
    .bail(),
  body('location.country')
    .notEmpty()
    .withMessage("El valor de 'country' dentro de 'location' no debe estar vacia")
    .isString()
    .withMessage("El valor de 'country' dentro de 'location' debe ser de tipo String")
    .bail(),
  body('location.postal_code')
    .notEmpty()
    .withMessage("El valor de 'postal_code' dentro de 'location' no debe estar vacia")
    .isString()
    .withMessage("El valor de 'postal_code' dentro de 'location' debe ser un String")
    .bail(),
  body('sports').isArray().withMessage("El campo de 'sports' debe ser un Array").bail(),
];

module.exports = userMiddleware;
