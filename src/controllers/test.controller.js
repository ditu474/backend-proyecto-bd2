const testController = {};

testController.test = (req, res, next) => {
  res.send('Working...');
};

module.exports = testController;
