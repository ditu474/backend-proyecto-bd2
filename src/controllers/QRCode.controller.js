const QRModel = require('../models/QRCode.model');
const catchAsync = require('../utils/catchAsync');
const QRCode = require('qrcode');
const fs = require('fs');

const QRCodeController = {};

QRCodeController.getQRImage = catchAsync(async (req, res) => {
  const qrDocument = await QRModel.findById(req.params.id);
  if (qrDocument) {
    res.status(200).contentType('image/png').send(qrDocument.image);
  } else {
    res.status(404).json({
      message: 'No se ha encontrado la imagen del codigo QR',
    });
  }
});

QRCodeController.getQRInfo = catchAsync(async (req, res) => {
  const qrDocument = await QRModel.findById(req.params.id).select(
    '-image -_id -id_formulario -__v'
  );
  if (qrDocument) {
    res.status(200).json({
      data: qrDocument,
    });
  } else {
    res.status(404).json({
      message: 'No se ha encontrado la informacion del codigo QR',
    });
  }
});

QRCodeController.createQRCode = async (req, res, formDocument) => {
  const userCanGetQR = checkIfUserCanGetQR(
    formDocument.sintoma_ultimos_dias,
    formDocument.identificacion_contacto,
    formDocument.pruebas_diagnosticas
  );

  if (userCanGetQR) {
    const { dia_entrada, email_usuario } = req.body;
    const qrDocument = await createQRDocument(formDocument.id, dia_entrada, email_usuario);
    const imagePath = `./${qrDocument.id}.png`;
    const url = `http://${req.headers.host}/api/qr/info/${qrDocument.id}`;
    QRCode.toFile(
      imagePath,
      url,
      {
        color: {
          dark: '#24b03e',
          light: '#0000',
        },
      },
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({
            message: 'No se logró crear el codigo QR',
          });
        } else {
          updateQRDocument(req, res, qrDocument, imagePath, formDocument);
        }
      }
    );
  } else {
    res.status(201).json({
      message: 'Se ha registrado el formulario',
      formData: formDocument,
    });
  }
};

const updateQRDocument = (req, res, qrDocument, imagePath, formDocument) => {
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(500).json({
        message: 'No se logró guardar el codigo QR en la base de datos',
      });
    }
    qrDocument.image = data;
    qrDocument.save();
    res.status(201).json({
      message: 'Se ha registrado el formulario y se ha creado el codigo QR',
      qrImage: `http://${req.headers.host}/api/qr/image/${qrDocument.id}`,
      formData: formDocument,
    });
  });
  fs.unlinkSync(imagePath);
};

const createQRDocument = async (id_formulario, dia_entrada, email_usuario) => {
  const qrDocument = await QRModel.create({
    id_formulario,
    dia_entrada,
    email_usuario,
  });
  return qrDocument;
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
