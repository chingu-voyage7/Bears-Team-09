const connect = require("./db");

class Table {
  async create() {
    const client = await connect();
    const query = `INSERT INTO ${this.tableName} (${this.pk}) VALUES ($1)`;
    const values = [this.data[this.pk]];
    return client.query(query, values).finally(() => client.end());
  }

  async readData() {
    const client = await connect();
    const query = `SELECT * from ${this.tableName} WHERE ${this.pk} = $1`;
    const values = [this.data[this.pk]];
    return client
      .query(query, values)
      .then(res => {
        if (res.rows.length === 0) throw new Error(`${this.tableName.slice(0, this.tableName.length - 1)} not found`);
        else {
          this.saveDataToSelf(res.rows[0]);
          return this;
        }
      })
      .finally(() => client.end());
  }

  saveDataToSelf(data) {
    Object.keys(data).forEach(key => {
      this.data[key] = data[key];
    });
    return this;
  }

  async writeData() {
    const client = await connect();
    const [query, values] = this.assembleQuery({ data: this.data, tableName: this.tableName, pk: this.pk });
    return client.query(query, values).finally(() => client.end());
  }

  assembleQuery() {
    let query = `UPDATE ${this.tableName} SET `;
    let counter = 0;
    const values = [];

    console.log(this.data);
    query = Object.getOwnPropertyNames(this.data)
      .reduce((acc, property) => {
        values.push(this.data[property].toString());
        return `${acc} ${property} = $${++counter},`;
      }, query)
      .replace(/,$/g, ""); // strip comma at the end

    query += ` WHERE ${this.pk} = $${++counter}`;
    values.push(this.data[this.pk]);
    return [query, values];
  }

  async delete() {
    const client = await connect();
    const query = `DELETE FROM ${this.tableName} WHERE ${this.pk} = $1`;
    const values = [this.data[this.pk]];
    return client.query(query, values).finally(() => client.end());
  }
}

module.exports = Table;
