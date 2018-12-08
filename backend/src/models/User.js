const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const APIError = require('../utils/APIError.js');
const Table = require('./Table');

const SECRET = process.env.JWT_SECRET || 'Default_JWT-Secret';
const JWT_EXP_THRESHOLD = process.env.JWT_EXP_THRESHOLD || '1 day';

class User extends Table {
  constructor(data={}) {
    const pk = 'id';
    const tableName = 'users';
    const ACCEPTED_FIELDS = ['id', 'email', 'firstName', 'lastName', 'password', 'bio'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }

  refreshToken() {
    return jwt.sign({id: this.data[this.pk]}, SECRET, {expiresIn: JWT_EXP_THRESHOLD});
  }

  hashPassword() {
    return bcrypt.hash(this.data.password, 10)
                 .then(hash => { this.data.password = hash; });
  }

  create() {
    return this.hashPassword().then(() => super.create()).then(() => {delete this.data.password;});
  }

  read() {
    return super.read()
                .then((data) => {
                  if (data.length === 0) {
                    throw new APIError('Not found', 404);
                  } else if (data.length === 1) {
                    const {password, ...rest} = data[0];
                    this.data = rest;
                    this[this.pk] = this.data[this.pk];
                  }
                  return data;
                });
  }

  update() {
    return 'password' in this.data ? this.hashPassword().then(() => super.update()) : super.update();
  }
}

module.exports = User;
