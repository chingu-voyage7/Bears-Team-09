const Table = require("./Table");

class User extends Table {
  constructor(email) {
    super();
    this.data = { email };
    this.tableName = "users";
    this.pk = "email";
    this.saveDataToSelf = this.saveDataToSelf.bind(this);
  }
}

module.exports = User;

// // Usage example
// // Create a user object
// const testUser = new User("test2@test.com");

// // Save new user to DB
// testUser.create();

// // Update user object
// testUser.data.bio = "New bio 4";
// testUser.data.password = "New hash 4";
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
