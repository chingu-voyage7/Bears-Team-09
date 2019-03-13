const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const APIError = require("../utils/APIError.js");
const Table = require("./Table");

const SECRET = process.env.JWT_SECRET || "Default_JWT-Secret";
const JWT_EXP_THRESHOLD = process.env.JWT_EXP_THRESHOLD || "60d";

class User extends Table {
  constructor(rawData = {}) {
    const pk = "id";
    const tableName = "users";
    const ACCEPTED_FIELDS = ["id", "email", "first_name", "last_name", "password", "bio", "image"];
    const cleanData = {};
    Object.keys(rawData).forEach(key => {
      if (ACCEPTED_FIELDS.includes(key)) {
        cleanData[key] = rawData[key];
      }
    });
    super(tableName, pk, cleanData);
    this.ACCEPTED_FIELDS = ACCEPTED_FIELDS;
    this.REQUIRED_FIELDS = ["email"];
    this.parseOpts(rawData);
  }

  refreshToken() {
    console.log(JWT_EXP_THRESHOLD);
    return jwt.sign({ id: this.data[this.pk] }, SECRET, { expiresIn: JWT_EXP_THRESHOLD });
  }

  hashPassword() {
    // if user was creater without password(from auth/google endpoint) there is no need to hash it
    return "password" in this.data
      ? bcrypt.hash(this.data.password, 10).then(hash => {
          this.data.password = hash;
        })
      : new Promise(resolve => resolve());
  }

  create() {
    return this.hashPassword()
      .then(() => super.create())
      .then(([data]) => {
        this.data = data;
        delete this.data.password;
        return this.data;
      });
  }

  read() {
    return super.read().then(data => {
      if (data.length === 0) {
        throw new APIError("user not found", 404);
      } else if (data.length === 1) {
        const { password, ...rest } = data[0];
        this.data = rest;
        this[this.pk] = this.data[this.pk];
      }
      return data;
    });
  }

  update() {
    return "password" in this.data ? this.hashPassword().then(() => super.update()) : super.update();
  }
}

module.exports = User;
