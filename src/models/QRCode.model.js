const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  dia_entrada: Date,
  email_usuario: String,
  id_formulario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Form',
  },
  image: Buffer,
});

const QRCodeModel = mongoose.model('QRCode', QRCodeSchema);

module.exports = QRCodeModel;
