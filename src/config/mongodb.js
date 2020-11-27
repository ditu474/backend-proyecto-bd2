const mongoose = require('mongoose');

const URI = process.env.MONGO_URL || 'mongodb://localhost:27017/covidpoli';

async function initMongo() {
  console.log('Initialising MongoDB...');
  let success = false;

  while (!success) {
    try {
      await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      success = true;
    } catch {
      console.log('Error connecting to MongoDB, retrying in 1 second');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log('MongoDB initialised');
}

module.exports = initMongo;
