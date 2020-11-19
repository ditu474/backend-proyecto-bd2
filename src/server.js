const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  process.exit(1);
});

dotenv.config();

const app = require('./app');

require('./config/mongodb');
require('./config/postgresdb');

const port = process.env.PORT || 3050;
const server = app.listen(port, () => console.log('Server Running'));

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
