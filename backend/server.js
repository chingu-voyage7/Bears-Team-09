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
  console.log("Connected");
  client.query("SELECT * from events", (err, res) => {
    console.log(err, res);
    client.end();
  });
})();
