const { Pool } = require("pg");
const APIError = require("../utils/APIError");

const DB_DATA = {
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDB || 'postgres',
  password: process.env.PGPASSWORD || '123456',
  port: process.env.PGPORT || 5432
};
const pool = new Pool(DB_DATA);

module.exports = {
  query: (text, params) => pool.connect()
    .catch(() => { throw new APIError('DB connection error', 500);})
    .then(client => client.query(text, params)
      .then(res => res.rows)
      .catch(err => {throw err;})
      .finally(() => client.release())
    )
};

// run migrations with
// DATABASE_URL=postgres://postgres:123456@docker.vm/postgres npm run migrate up
