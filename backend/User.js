const connect = require("./db");

class User {
  constructor(email) {
    this.data = { email };
    this.saveDataToSelf = this.saveDataToSelf.bind(this);
  }

  async create() {
    const client = await connect();
    const query = `INSERT INTO users (email) VALUES ('${this.data.email}')`;
    return client.query(query).finally(() => client.end());
  }

  async readData() {
    const client = await connect();
    const query = `SELECT * from users WHERE email = '${this.data.email}'`;
    return client
      .query(query)
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
    const query = this.assembleQuery(Object.getOwnPropertyNames(this.data));
    return client.query(query).finally(() => client.end());
  }

  assembleQuery(properties) {
    let query = "UPDATE users SET ";
    query = properties
      .reduce((acc, property) => `${acc} ${property} = '${this.data[property].toString()}',`, query)
      .replace(/,$/g, ""); // strip comma at the end
    query += ` WHERE email = '${this.data.email}'`;
    return query;
  }

  async delete() {
    const client = await connect();
    const query = `DELETE FROM users WHERE email = '${this.data.email}'`;
    return client.query(query).finally(() => client.end());
  }
}

module.exports = User;

// // Usage example
// // Create a user object
// const testUser = new User("test@test.com");

// // Save new user to DB
// testUser.create();

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
