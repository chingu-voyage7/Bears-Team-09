const connect = require("./db");

class User {
  constructor(email) {
    this.email = email;
    this.saveDataToSelf = this.saveDataToSelf.bind(this);
  }

  async readData() {
    const client = await connect();
    const query = `SELECT * from users WHERE email = '${this.email}'`;
    return client
      .query(query)
      .then(res => res.rows[0])
      .then(this.saveDataToSelf)
      .finally(() => client.end());
  }

  saveDataToSelf(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });
    return this;
  }

  async writeData() {
    const client = await connect();
    const query = this.assembleQuery(Object.getOwnPropertyNames(this));
    return client.query(query).finally(() => client.end());
  }

  assembleQuery(properties) {
    let query = "UPDATE users SET ";
    query = properties
      .reduce((acc, property) => `${acc} ${property} = '${this[property].toString()}',`, query)
      .replace(/,$/g, ""); // strip comma at the end
    query += ` WHERE email = '${this.email}'`;
    return query;
  }

  async delete() {
    const client = await connect();
    const query = `DELETE FROM users WHERE email = '${this.email}'`;
    return client.query(query).finally(() => client.end());
  }
}

module.exports = User;

// // Usage example
// // Create a user
// const testUser = new User("test@test.com");

// // Update user
// testUser.bio = "New bio 2";
// testUser.password = "New hash 2";
// testUser
//   .writeData()
//   .then(console.log)
//   .catch(console.log);

// // Get user info
// testUser
//   .readData()
//   .then(console.log)
//   .catch(console.log);

// console.log(testUser.password); // New hash 2

// // Delete user
// testUser.delete();
