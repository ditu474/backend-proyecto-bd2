const router = require('express').Router();
const QRCodeController = require('../controllers/QRCode.controller');
const QRMiddleware = require('../middlewares/qrCode.middleware');
const validateResults = require('../middlewares/validationResult.middleware');

router.get('/image/:id', QRMiddleware.validateId, validateResults, QRCodeController.getQRImage);
router.get('/info/:id', QRMiddleware.validateId, validateResults, QRCodeController.getQRInfo);

module.exports = router;
