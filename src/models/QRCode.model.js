const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  dia_entrada: Date,
  email_usuario: String,
  id_documento: {
    type: mongoose.Schema.ObjectId,
    ref: 'Form',
    unique: true,
  },
});

const QRCodeModel = mongoose.model('QRCode', QRCodeSchema);

module.exports = QRCodeModel;
