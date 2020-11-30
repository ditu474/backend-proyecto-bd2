const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/users.middleware');
const validateResult = require('../middlewares/validationResult.middleware');

const router = require('express').Router();

router.get('/login', userMiddleware.login, validateResult, userController.login);
router
  .route('/familyinfo')
  .get(userMiddleware.getFamilyInfo, validateResult, userController.getFamilyInfo)
  .post(userMiddleware.postFamilyInfo, validateResult, userController.postFamilyInfo);

module.exports = router;
