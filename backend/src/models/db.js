const { Client } = require("pg");
const APIError = require("../utils/APIError");

const DB_DATA = {
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDB || "postgres",
  password: process.env.PGPASSWORD || "123456",
  port: process.env.PGPORT || 5432
};

module.exports = {
  query: async (text, params) => {
    const client = new Client(DB_DATA);
    return client
      .connect()
      .catch(() => {
        throw new APIError("DB connection error", 500);
      })
      .then(() => client.query(text, params))
      .then(res => res.rows)
      .catch(err => {
        throw err;
      })
      .finally(() => client.end());
  }
};

// run migrations with
// DATABASE_URL=postgres://postgres:123456@docker.vm/postgres npm run migrate up
