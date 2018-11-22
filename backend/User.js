const connect = require("./db");

class User {
  constructor(email) {
    this.email = email;
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  async getUserInfo() {
    const client = await connect();
    return client
      .query(`SELECT * from users WHERE email = '${this.email}'`)
      .then(res => res.rows[0])
      .catch(console.log)
      .finally(() => client.end());
  }
  async setPassword(password) {
    const client = await connect();
    return client
      .query(`UPDATE users SET password = '${password}' WHERE email = '${this.email}'`)
      .catch(console.log)
      .finally(() => client.end());
  }
}

//Usage example
//Create a user
const testUser = new User("test@test.com");

//Get user info
testUser
  .getUserInfo()
  .then(console.log)
  .catch(console.log);
testUser
  .setPassword("newpwd")
  .then(console.log)
  .catch(console.log);
// returns a promise that resolves to a user object:
// { email: 'test@test.com',
// first_name: 'test',
// last_name: 'test',
// bio: null,
// events: null,
// password: 'newhash' }

// //Update user info
// testUser
//   .setUserInfo({password, firstName, lastName, bio})
//   .then(console.log)
//   .catch(console.log);
// // returns a promise that resolves to a user object

