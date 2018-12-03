const Table = require('./Table'),
      jwt = require('jsonwebtoken'),
      SECRET = process.env.JWT_SECRET || 'Default_JWT-Secret',
      JWT_EXP_THRESHOLD = process.env.JWT_EXP_THRESHOLD || '1 day';

class User extends Table {
  constructor(data) {
    const pk = 'email',
          tableName = 'users',
          ACCEPTED_FIELDS = ['email', 'first_name', 'last_name', 'password', 'bio'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }

  refreshToken() {
    return jwt.sign({pk: this[this.pk]}, SECRET, {expiresIn: JWT_EXP_THRESHOLD});
  }
}

module.exports = User;
