const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Table = require('./Table');

const SECRET = process.env.JWT_SECRET || 'Default_JWT-Secret';
const JWT_EXP_THRESHOLD = process.env.JWT_EXP_THRESHOLD || '1 day';

class User extends Table {
  constructor(data={}) {
    const pk = 'email';
    const tableName = 'users';
    const ACCEPTED_FIELDS = ['email', 'first_name', 'last_name', 'password', 'bio'];
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

  hashPassword() {
    return bcrypt.hash(this.data.password, 10)
                 .then(hash => { this.data.password = hash; });
  }

  create() {
    return 'password' in this.data ? this.hashPassword().then(() => super.create()) : super.create();
  }

  read() {
    const params = {};
    params[this.pk] = this[this.pk];
    return super.read(params);
  }

  update() {
    return 'password' in this.data ? this.hashPassword().then(() => super.update()) : super.update();
  }
}

module.exports = User;
