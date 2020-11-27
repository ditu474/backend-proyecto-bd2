const { Client } = require('pg');

async function initPostgres() {
  console.log('Initialising Postgres...');
  let success = false;
  while (!success) {
    try {
      const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
      });
      await client.connect();
      success = true;
    } catch {
      console.log('Error connecting to Postgres, retrying in 3 second');
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  console.log('Postgres initialised');
}

module.exports = initPostgres;
