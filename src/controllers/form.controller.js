const FormModel = require('../models/form.model');
const catchAsync = require('../utils/catchAsync');
const QRCodeController = require('./QRCode.controller');

const formController = {};

formController.postForm = catchAsync(async (req, res) => {
  const {
    email_usuario,
    antecedentes,
    sintoma_ultimos_dias,
    identificacion_contacto,
    sector_trabajo,
    pruebas_diagnosticas,
  } = req.body;

  const formDocument = await FormModel.create({
    email_usuario,
    antecedentes,
    sintoma_ultimos_dias,
    identificacion_contacto,
    sector_trabajo,
    pruebas_diagnosticas,
  });

  QRCodeController.createQRCode(req, res, formDocument);
});

module.exports = formController;
