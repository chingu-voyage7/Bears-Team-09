const db = require('./db');

class Table {
  create() {
    const keys = Object.keys(this.data),
          pargs = keys.map((_, p) => `$${p + 1}`),
          values = keys.map(k => this.data[k]),
          text = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${pargs.join(', ')})`;
    return db.query(text, values);
  }

  read() {
    const text = `SELECT * from ${this.tableName} WHERE ${this.pk} = $1`,
          values = [this.data[this.pk]];
    return db.query(text, values);
  }

  update() {
    const keyValuePairs = Object.keys(this.data).map(k => `${k} = ${this.data[k]}`),
          text = `UPDATE ${this.tableName} SET ${keyValuePairs.join(', ')} WHERE ${this.pk} = $1`,
          values = [this.data[this.pk]];
    return db.query(text, values);
  }

  delete() {
    const text = `DELETE FROM ${this.tableName} WHERE ${this.pk} = $1`,
          values = [this.data[this.pk]];
    return db.query(text, values);
  }
};

module.exports = Table;
