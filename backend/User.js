const connect = require("./db");

class User {
  constructor(email) {
    this.email = email;
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  async getUserInfo() {
    const client = await connect();
    return (
      client
        // .query(`SELECT * from users WHERE email = ${this.email}`)
        .query(`SELECT * from users`)
        .then(res => res.rows)
        .catch(console.log)
        .finally(() => client.end())
    );
  }
}

const test = new User("test@test.com");
test
  .getUserInfo()
  .then(console.log)
  .catch(console.log);
