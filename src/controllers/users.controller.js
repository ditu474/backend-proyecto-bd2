const { user } = require('../config/postgresdb');
const client = require('../config/postgresdb');
const catchAsync = require('../utils/catchAsync');

const userController = {};

userController.login = catchAsync(async (req, res, next) => {
  // const email = req.body["email"]
  const { email, typeOfUser } = req.body;
  switch (typeOfUser) {
    case 'estudiante':
      await client.query(`SELECT * FROM estudiantes WHERE email='${email}'`, (error, response) => {
        if (error) {
          res.status(400).json({
            message: error.message,
          });
        } else {
          if (!response.rows[0]) {
            res.status(404).json({
              message: 'the student was not found',
            });
          } else {
            res.status(200).json({
              data: response.rows[0],
            });
          }
        }
      });
      break;
    case 'docente':
      break;
    case 'empleado':
      break;
  }
});

module.exports = userController;
