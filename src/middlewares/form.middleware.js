const { body } = require('express-validator');

const formMiddleware = {};

const booleanFormValidatorFactory = (key, ...args) => {
  const validators = [
    body(key).notEmpty().withMessage(`La llave '${key}' no debe estar vacia`).bail(),
  ];
  args.forEach((value) => {
    validators.push(
      body(`${key}.${value}`)
        .isBoolean()
        .withMessage(`La llave '${value}' de '${key}' debe tener un valor booleano`)
        .bail()
    );
  });
  return validators;
};

const diaEntradaValidator = [
  body('dia_entrada')
    .isISO8601()
    .withMessage(
      "La llave 'dia_entrada' debe tener como valor un String con una fecha en formato ISO8601"
    )
    .bail(),
];

const emailValidator = [
  body('email_usuario')
    .isEmail()
    .withMessage("La llave 'email_usuario' debe tener como valor un email valido")
    .bail(),
];

const antecedentesValidator = booleanFormValidatorFactory(
  'antecedentes',
  'hipertension',
  'diabetes',
  'enfermedad_pulmonar',
  'enfermedad_renal',
  'enfermedad_autoinmune',
  'malnutricion',
  'tabaquismo',
  'embarazo',
  'convive_mayores',
  'tratamiento_medico'
);

const sintomasValidator = booleanFormValidatorFactory(
  'sintoma_ultimos_dias',
  'tos',
  'dolor_garganta',
  'fiebre',
  'secrecion_nasal',
  'malestar_general',
  'disminucion_percepcion',
  'dificultad_respiratoria',
  'diarrea'
);

const contactoValidator = booleanFormValidatorFactory(
  'identificacion_contacto',
  'contacto_positivo',
  'contacto_sintomatico'
);

const sectorValidator = [
  body('sector_trabajo')
    .notEmpty()
    .withMessage("La llave 'sector_trabajo' no debe estar vacia")
    .bail(),
  body('sector_trabajo.sector')
    .isString()
    .withMessage("La llave 'sector' de 'sector_trabajo' debe tener un valor String")
    .bail(),
  body('sector_trabajo.area_durante_covid')
    .isString()
    .withMessage("La llave 'area_durante_covid' de 'sector_trabajo' debe tener un valor String")
    .bail(),
  body('sector_trabajo.otra_area')
    .if((value) => !!value)
    .isString()
    .withMessage("La llave 'otra_area' de 'sector_trabajo' debe tener un valor String")
    .bail(),
];

const pruebasValidator = booleanFormValidatorFactory(
  'pruebas_diagnosticas',
  'prueba_con_muestra',
  'prueba_sangre',
  'aislamiento',
  'incapacidad'
);

formMiddleware.formValidator = [
  ...diaEntradaValidator,
  ...emailValidator,
  ...antecedentesValidator,
  ...sintomasValidator,
  ...contactoValidator,
  ...sectorValidator,
  ...pruebasValidator,
];

module.exports = formMiddleware;
