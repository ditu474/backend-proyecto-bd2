const formMiddleware = require('../middlewares/form.middleware');
const validationResult = require('../middlewares/validationResult.middleware');
const formController = require('../controllers/form.controller');

const router = require('express').Router();

router.post('/', formMiddleware.formValidator, validationResult, formController.postForm);

module.exports = router;
