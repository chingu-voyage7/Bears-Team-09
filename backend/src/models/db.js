const { Client } = require("pg");

const DB_DATA = {
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'docker.vm',
  database: process.env.PGDB || 'postgres',
  password: process.env.PGPASSWORD || '123456',
  port: process.env.PGPORT || 5432
};

module.exports = {
  query: async (text, params) => {
    const client = new Client(DB_DATA);
    await client.connect();
    return client.query(text, params).then(res => {
      client.end();
      return res.rows;
    });
  }
};