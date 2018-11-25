const connect = require("./db");
const { assembleQuery } = require("./helpers");

class User {
  constructor(email) {
    this.data = { email };
    this.tableName = "users";
    this.pk = "email";
    this.saveDataToSelf = this.saveDataToSelf.bind(this);
  }

  async create() {
    const client = await connect();
    const query = `INSERT INTO users (email) VALUES ($1)`;
    const values = [this.data.email];
    return client.query(query, values).finally(() => client.end());
  }

  async readData() {
    const client = await connect();
    const query = `SELECT * from users WHERE email = $1`;
    const values = [this.data.email];
    return client
      .query(query, values)
      .then(res => {
        if (res.rows.length === 0) throw new Error("User not found");
        else {
          this.saveDataToSelf(res.rows[0]);
          return this;
        }
      })
      .finally(() => client.end());
  }

  saveDataToSelf(data) {
    Object.keys(data).forEach(key => {
      this.data[key] = data[key];
    });
    return this;
  }

  async writeData() {
    const client = await connect();
    const [query, values] = assembleQuery({ data: this.data, tableName: this.tableName, pk: this.pk });
    return client.query(query, values).finally(() => client.end());
  }

  async delete() {
    const client = await connect();
    const query = `DELETE FROM users WHERE email = $1`;
    const values = [this.data.email];
    return client.query(query, values).finally(() => client.end());
  }
}

module.exports = User;

// // Usage example
// // Create a user object
// const testUser = new User("test@test.com");

// // // Save new user to DB
// // testUser.create();

// // Update user object
// testUser.data.bio = "New bio 2";
// testUser.data.password = "New hash 2";
// // Save changes to DB
// testUser
//   .writeData()
//   .then(console.log)
//   .catch(console.log);

// // Populate user object with data from DB
// testUser
//   .readData()
//   .then(console.log)
//   .catch(console.log);

// console.log(testUser.password); // New hash 2

// // Delete user
// testUser.delete();
