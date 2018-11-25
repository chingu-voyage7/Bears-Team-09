const Table = require("./Table");

class Event extends Table {
  constructor(id) {
    super();
    this.data = { id };
    this.tableName = "events";
    this.pk = "id";
    this.saveDataToSelf = this.saveDataToSelf.bind(this);
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
