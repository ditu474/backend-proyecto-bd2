const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/covidpoli';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log('Connected To Mongo'))
  .catch((err) => console.error(err));

module.exports = mongoose;
