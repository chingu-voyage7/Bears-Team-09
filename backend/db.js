require("dotenv").config();
const { Client } = require("pg");
console.log(process.env.PGUSER);

async function connect() {
  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDB,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  });
  await client
    .connect()
    .catch(err => console.log("DB connection failed: ", err));
  return client;
}

module.exports = connect;
