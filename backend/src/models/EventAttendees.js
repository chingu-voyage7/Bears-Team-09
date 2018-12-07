const db = require('./db');

const Table = require('./Table');

class EventAttendee extends Table {
  constructor(data={}) {
    const pk = 'id';
    const tableName = 'event_attendees';
    const ACCEPTED_FIELDS = ['id', 'event_id', 'user_id'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }

  _read(text, fieldName, idValue) {
    const where = ` WHERE ${this.tableName}.${fieldName} = $1`;
    return db.query(text + where, [idValue]);
  }

  getAllAttendees(eventId) {
    const text = `
      SELECT users.first_name, users.last_name, users.bio FROM users
      INNER JOIN ${this.tableName} ON users.email = ${this.tableName}.user_id`;
    return this._read(text, 'event_id', eventId);
  }

  getAllEvents(userId) {
    const text = `SELECT events.id, events.name, events.description,
      activities.name as activity, places.country, places.city,
      events.date_from, events.date_to, events.minpeople, events.maxpeople FROM events
      INNER JOIN ${this.tableName} ON events.id = ${this.tableName}.event_id
      INNER JOIN activities ON events.activity = activities.id
      LEFT JOIN places ON places.id = events.place`;
      console.log(text);
      return this._read(text, 'user_id', userId);
  }
}

module.exports = EventAttendee;
