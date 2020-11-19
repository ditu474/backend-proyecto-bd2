const mongoose = require('mongoose');

const URI = 'mongodb://localhost/polls';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db) => console.log('db is connected'))
  .catch((err) => console.error(err));

module.exports = mongoose;
