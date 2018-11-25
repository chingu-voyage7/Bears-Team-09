const connect = require("./db");
const { assembleQuery } = require("./helpers");

class Event {
  constructor(id) {
    this.data = { id };
    this.saveDataToSelf = this.saveDataToSelf.bind(this);
  }

  async create() {
    const client = await connect();
    const query = `INSERT INTO events (id) VALUES ($1)`;
    const values = [this.data.id];
    return client.query(query, values).finally(() => client.end());
  }

  async readData() {
    const client = await connect();
    const query = `SELECT * from events WHERE id = $1`;
    const values = [this.data.id];
    return client
      .query(query, values)
      .then(res => {
        if (res.rows.length === 0) throw new Error("Event not found");
        else {
          this.saveDataToSelf(res.rows[0]);
          return this;
        }
      })
      .then(this.saveDataToSelf)
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
    const [query, values] = assembleQuery({ data: this.data, tableName: this.tableName, pk: this.pk });
    return client.query(query, values).finally(() => client.end());
  }

  async delete() {
    const client = await connect();
    const query = `DELETE FROM events WHERE id = '${this.data.id}'`;
    return client.query(query).finally(() => client.end());
  }
}

module.exports = Event;

// Usage example
// Create an event object
// const testEvent = new Event("123");

// Create event in DB
// testEvent.create();

// Update event object
// testEvent.data.description = "Get drunk";
// testEvent.data.city = "Toronto";
// Save changes to DB
// testEvent
//   .writeData()
//   .then(console.log)
//   .catch(console.log);

// // Populate event object with data from DB
// testEvent
//   .readData()
//   .then(console.log)
//   .catch(console.log);

// console.log(testEvent.city); // Toronto

// // Delete event
// testEvent.delete();
