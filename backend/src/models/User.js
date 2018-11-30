const Table = require("./Table"),
      jwt = require('jsonwebtoken'),
      SECRET = process.env.JWT_SECRET || 'Default_JWT-Secret',
      JWT_EXP_THRESHOLD = process.env.JWT_EXP_THRESHOLD || '1 hour';

class User extends Table {
  constructor(data) {
    super();
    this.data = data;
    this.tableName = "users";
    this.pk = "email";
  }

  refreshToken() {
    return jwt.sign({pk: this.data[this.pk]}, SECRET, {expiresIn: JWT_EXP_THRESHOLD});
  }
}

module.exports = User;
