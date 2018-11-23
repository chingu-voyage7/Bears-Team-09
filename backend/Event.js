const connect = require("./db");

class Event {
  constructor(id) {
    this.data = { id };
    this.saveDataToSelf = this.saveDataToSelf.bind(this);
  }

  async create() {
    const client = await connect();
    const query = `INSERT INTO events (id) VALUES ('${this.data.id}')`;
    return client.query(query).finally(() => client.end());
  }

  async readData() {
    const client = await connect();
    const query = `SELECT * from events WHERE id = '${this.data.id}'`;
    return client
      .query(query)
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
    const query = this.assembleQuery(Object.getOwnPropertyNames(this.data));
    return client.query(query).finally(() => client.end());
  }

  assembleQuery(properties) {
    let query = "UPDATE events SET ";
    query = properties
      .reduce((acc, property) => `${acc} ${property} = '${this.data[property].toString()}',`, query)
      .replace(/,$/g, ""); // strip comma at the end
    query += ` WHERE id = '${this.data.id}'`;
    return query;
  }

  async delete() {
    const client = await connect();
    const query = `DELETE FROM events WHERE id = '${this.data.id}'`;
    return client.query(query).finally(() => client.end());
  }
}

module.exports = Event;

// // Usage example
// // Create an event object
// const testEvent = new Event("123");

// // Create event in DB
// testEvent.create();

// // Update event object
// testEvent.data.description = "Get drunk";
// testEvent.data.city = "Toronto";
// // Save changes to DB
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
