const pick = require("lodash/pick");

const db = require("./db");

class Table {
  constructor(tableName, pk, data = {}) {
    if (tableName === undefined) {
      throw Error("DB table name is not set");
    }
    this.tableName = tableName;
    if (pk === undefined) {
      throw Error("PK name is not set");
    }
    this.pk = pk;
    this.data = data;
    this.REQUIRED_FIELDS = [];
    this.opts = {
      // default read options
      limit: null,
      offset: null,
      orderby: null,
      compare: "=",
      combine: "AND"
    };
  }

  parseOpts(data) {
    const LOGICAL_OPERATORS = {
      and: "AND",
      or: "OR"
    };
    const COMPARE_OPERATORS = {
      eq: "=",
      in: "~",
      gt: ">",
      lt: "<"
    };
    const limit = Number(data.limit) || 0;
    const offset = Number(data.offset) || 0;
    const { orderby, compare, combine } = data;

    if (limit && limit > 0) {
      this.opts.limit = limit;
    }
    if (offset && offset > 0) {
      this.opts.offset = offset;
    }
    if (orderby && this.ACCEPTED_FIELDS.includes(orderby)) {
      this.opts.orderby = orderby;
    }
    if (compare && compare in COMPARE_OPERATORS) {
      this.opts.compare = COMPARE_OPERATORS[compare];
    }
    if (combine && combine in LOGICAL_OPERATORS) {
      this.opts.combine = LOGICAL_OPERATORS[combine];
    }
  }

  getSearchCriteria() {
    let i = 1;
    return Object.keys(this.data).reduce(
      (acc, key) => {
        acc.text.push(`${this.tableName}.${key} ${this.opts.compare} $${i++}`);
        acc.values.push(this.data[key]);
        return acc;
      },
      { text: [], values: [] }
    );
  }

  getMissingFields() {
    return this.REQUIRED_FIELDS.filter(f => Object.keys(this.data).indexOf(f) === -1);
  }

  set(params) {
    this.data = { ...this.data, ...pick(params, this.ACCEPTED_FIELDS) };
  }

  create() {
    let index = 1;
    // return rejected promise in case of incomplete data, to catch it later
    // and return meaningful error to the user
    const fieldsMissing = this.getMissingFields();
    if (fieldsMissing.length > 0) {
      return new Promise((resolve, reject) => {
        reject(new Error(`Field(s) ${fieldsMissing.map(f => `'${f}'`).join(", ")} is(are) missing`));
      });
    }
    const prepared = Object.keys(this.data).reduce(
      (acc, key) => {
        acc.keys.push(key);
        acc.indexes.push(`$${index++}`);
        acc.values.push(this.data[key]);
        return acc;
      },
      { keys: [], indexes: [], values: [] }
    );
    const text = `INSERT INTO ${this.tableName} (${prepared.keys.join(", ")}) VALUES (${prepared.indexes.join(
      ", "
    )}) RETURNING ${this.ACCEPTED_FIELDS.join(", ")}`;

    return db.query(text, prepared.values);
  }

  read(customText = null) {
    let text = customText || `SELECT * FROM ${this.tableName}`;
    const pk = this.data[this.pk];
    let values;
    if (pk) {
      text += ` WHERE ${this.tableName}.${this.pk} = $1`;
      values = [pk];
    } else if (Object.keys(this.data).length !== 0) {
      const searchCriteria = this.getSearchCriteria();
      text += ` WHERE ${searchCriteria.text.join(` ${this.opts.combine} `)}`;
      ({ values } = searchCriteria);
    }
    if (this.opts.orderby) {
      text += ` ORDER BY ${this.tableName}.${this.opts.orderby}`;
    }
    if (this.opts.limit) {
      text += ` LIMIT ${this.opts.limit}`;
    }
    if (this.opts.offset) {
      text += ` OFFSET ${this.opts.offset}`;
    }

    return db.query(text, values);
  }

  update() {
    // remove pk from this.data before update
    const { id, ...rest } = this.data;
    if (id === undefined || Object.keys(rest).length === 0) {
      throw new Error("Need to have both id and data to update table");
    }
    let index = 1;
    const prepared = Object.keys(rest).reduce(
      (acc, key) => {
        acc.keys.push(`${key} = $${index++}`);
        acc.values.push(`${rest[key]}`);
        return acc;
      },
      { keys: [], values: [] }
    );
    const text = `UPDATE ${this.tableName} SET ${prepared.keys.join(", ")} WHERE ${
      this.pk
    } = $${index} RETURNING ${this.ACCEPTED_FIELDS.join(", ")};`;
    prepared.values.push(id);
    return db.query(text, prepared.values);
  }

  delete() {
    const text = `DELETE FROM ${this.tableName} WHERE ${this.pk} = $1;`;
    const values = [this.data[this.pk]];
    return db.query(text, values);
  }
}

module.exports = Table;
