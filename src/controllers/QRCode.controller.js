const QRModel = require('../models/QRCode.model');
const catchAsync = require('../utils/catchAsync');

const QRCodeController = {};

QRCodeController.createQRCode = async (req, res, formDocument) => {
  const userCanGetQR = checkIfUserCanGetQR(
    formDocument.sintoma_ultimos_dias,
    formDocument.identificacion_contacto,
    formDocument.pruebas_diagnosticas
  );

  if (userCanGetQR) {
    const { dia_entrada } = req.body;
    res.status(201).send('ok');
  } else {
    res.status(201).json({
      message: 'Se ha registrado el formulario',
      data: formDocument,
    });
  }
};

const checkIfUserCanGetQR = (...keys) => {
  for (key of keys) {
    const valores = Object.values(key);
    if (valores.includes(true)) {
      return false;
    }
  }
  return true;
};

module.exports = QRCodeController;
