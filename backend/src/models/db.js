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
    return client.connect()
                 .catch(() => { throw new Error('DB connection error');})
                 .then(() => client.query(text, params))
                 .then(res => res.rows)
                 .catch(err => { throw new Error(err.message);})
                 .finally(() => client.end());
  }
};


// run migrations with
// DATABASE_URL=postgres://postgres:123456@docker.vm/postgres npm run migrate up