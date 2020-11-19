const router = require('express').Router();

const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/users.middleware');
const validateResult = require('../middlewares/validationResult.middleware');

router.get('/', userMiddleware.login, validateResult, userController.login);

module.exports = router;
