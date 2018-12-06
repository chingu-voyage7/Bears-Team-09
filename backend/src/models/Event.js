const Table = require('./Table');

class Event extends Table {
  constructor(data) {
    const pk = 'id';
    const tableName = 'events';
    const ACCEPTED_FIELDS = ['name', 'description', 'activity', 'place', 'date_from', 'date_to', 'minpeople', 'maxpeople'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }
}

module.exports = Event;
