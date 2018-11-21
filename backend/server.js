require("dotenv").config();
const { Client } = require("pg");

(async function() {
  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDB,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  });
  client.connect();
  console.log("DB connection successful");
  client
    .query("SELECT * from events")
    .then(console.log)
    .catch(console.log)
    .finally(() => client.end());
})();
