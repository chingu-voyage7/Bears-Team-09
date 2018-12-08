const db = require('./db');

class Table {
  constructor(tableName, pk, data = {}) {
    if (tableName === undefined) {
      throw Error('DB table name is not set');
    };
    this.tableName = tableName;
    if (pk === undefined) {
      throw Error('PK name is not set');
    };
    this.pk = pk;
    if (pk in data) {
      this[pk] = data[pk];
    };
    this.data = data;
  }

  create() {
    let index = 1;
    const prepared = Object.keys(this.data).reduce((acc, key) => {
        acc.keys.push(key);
        acc.indexes.push(`$${index++}`);
        acc.values.push(this.data[key]);
        return acc;
      },
      {keys: [], indexes: [], values: []}
    );
    const text = `INSERT INTO ${this.tableName} (${prepared.keys.join(', ')}) VALUES (${prepared.indexes.join(', ')});`;
    return db.query(text, prepared.values);
  }

  read(compareOperator='=', logicalOperator='AND', customText=null) {
    const LOGICAL_OPERATORS = {
      'AND': 'AND',
      'OR': 'OR'
    };
    const COMPARE_OPERATORS = {
      '=': '=',
      '~': '~',
      '>': '>',
      '<': '<',
      'LIKE': 'LIKE'
    };
    const cOp = COMPARE_OPERATORS[compareOperator] || '=';
    const lOp = LOGICAL_OPERATORS[logicalOperator] || 'AND';
    let text = customText || `SELECT * FROM ${this.tableName}`;
    const pk = this[this.pk] || this.data[this.pk];
    let values;
    if (pk) {
      text += ` WHERE ${this.pk} = $1`;
      values = [pk];
    } else if (Object.keys(this.data).length !== 0) {
        let i = 1;
        const searchCriterias = Object.keys(this.data).reduce((acc, key) => {
          acc.text.push(`${this.tableName}.${key} ${cOp} $${i++}`);
          acc.values.push(this.data[key]);
          return acc;
        }, {text: [], values: []});
        text += ` WHERE ${searchCriterias.text.join(` ${lOp} `)}`;
        ({values} = searchCriterias);
      };
    return db.query(text, values);
  }

  update() {
    // remove pk from this.data before update
    const {data} = this;
    delete data[this.pk];
    let index = 1;
    const prepared = Object.keys(data).reduce((acc, key) => {
        acc.keys.push(`${key} = $${index++}`);
        acc.values.push(`${data[key]}`);
        return acc;
      },
      {keys: [], values: []}
    );
    const text = `UPDATE ${this.tableName} SET ${prepared.keys.join(', ')} WHERE ${this.pk} = $${index};`;
    prepared.values.push(this[this.pk]);
    return db.query(text, prepared.values);
  }

  delete() {
    const text = `DELETE FROM ${this.tableName} WHERE ${this.pk} = $1;`;
    const values = [this[this.pk]];
    return db.query(text, values);
  }
};

module.exports = Table;
