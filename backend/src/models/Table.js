const db = require('./db');

function validate(table) {
  if (table.tableName === undefined) {
    throw Error('DB table name is not set');
  };
  if (table.pk === undefined) {
    throw Error('PK name is not set');
  };
}

class Table {
  constructor(tableName, pk, data = {}) {
    this.tableName = tableName;
    this.pk = pk;
    if (pk in data) {
      this[pk] = data[pk];
      // delete data[pk];
    };
    this.data = data;
  }

  create() {
    validate(this);
    let index = 1;
    const prepared = Object.keys(this.data).reduce((accumulator, key) => {
        accumulator.keys.push(key);
        accumulator.indexes.push(`$${index++}`);
        accumulator.values.push(this.data[key]);
        return accumulator;
      },
      {keys: [], indexes: [], values: []}
    );
    const text = `INSERT INTO ${this.tableName} (${prepared.keys.join(', ')}) VALUES (${prepared.indexes.join(', ')});`;
    // eventually it will result in:
    // text: INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4);
    // prepared.values: ['Kenny', 'McCormick', '$2b$10$XBUfi5ztRo0EKQ5XaOVEf.KXdU8km1.SFm9fybKE3bjk8L5qTVMNe', 'kenny@gmail.com']
    return db.query(text, prepared.values);
  }

  read(params={}, useAND=true, operator='=') {
    validate(this);
    const SEARCH_OPERATORS = {
      '=': '=',
      '~': '~',
      '>': '>',
      '<': '<',
      'LIKE': 'LIKE'
    };
    let text = `SELECT * FROM ${this.tableName}`;
    let values = [];
    if (Object.keys(params).length !== 0) {
      const op = SEARCH_OPERATORS[operator] || '=';
      let i = 1;
      const searchCriterias = Object.keys(params).reduce((acc, key) => {
        acc.text.push(`${key} ${op} $${i++}`);
        acc.values.push(params[key]);
        return acc;
      }, {text: [], values: []});
      text += ` WHERE ${searchCriterias.text.join(` ${useAND ? 'AND' : 'OR'} `)}`;
      ({values} = searchCriterias);
    };
    return db.query(text, values);
  }

  update() {
    validate(this);
    // have to delete `pk` from `data` to avoid updating it
    if (this.pk in this.data) {
      delete this.data[this.pk];
    }
    let index = 1;
    const prepared = Object.keys(this.data).reduce((accumulator, val) => {
        accumulator.keys.push(`${val} = $${index++}`);
        accumulator.values.push(`${this.data[val]}`);
        return accumulator;
      },
      {keys: [], values: []}
    );
    const text = `UPDATE ${this.tableName} SET ${prepared.keys.join(', ')} WHERE ${this.pk} = $${index};`;
    prepared.values.push(this[this.pk]);
    // eventually it will result in:
    // text: UPDATE users SET first_name = $1, last_name = $2, password = $3 WHERE email = $4;
    // prepared.values: ['Kenny', 'McCormick', '$2b$10$XBUfi5ztRo0EKQ5XaOVEf.KXdU8km1.SFm9fybKE3bjk8L5qTVMNe', 'kenny@gmail.com']
    return db.query(text, prepared.values);
  }

  delete() {
    validate(this);
    const text = `DELETE FROM ${this.tableName} WHERE ${this.pk} = $1;`;
    const values = [this[this.pk]];
    return db.query(text, values);
  }
};

module.exports = Table;
