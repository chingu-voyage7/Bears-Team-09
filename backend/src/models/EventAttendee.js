const Table = require('./Table');

class EventAttendee extends Table {
  constructor(rawData={}) {
    const pk = 'id';
    const tableName = 'event_attendees';
    const ACCEPTED_FIELDS = ['id', 'event_id', 'user_id'];
    const cleanData = {};
    Object.keys(rawData).forEach(key => {
      if (ACCEPTED_FIELDS.includes(key)) {
        cleanData[key] = rawData[key];
      }
    });
    super(tableName, pk, cleanData);
    this.ACCEPTED_FIELDS = ACCEPTED_FIELDS;
    this.parseOpts(rawData);
  }

  getAllAttendees() {
    const text = `
      SELECT users.id, users.first_name, users.last_name, users.image FROM users
      INNER JOIN ${this.tableName} ON users.id = ${this.tableName}.user_id`;
    return super.read(text);
  }

  getAllEvents() {
    const text = `SELECT events.id, events.name, events.description,
      activities.name as activity, places.country, places.city,
      events.date_from, events.date_to, events.min_people, events.max_people FROM events
      INNER JOIN ${this.tableName} ON events.id = ${this.tableName}.event_id
      INNER JOIN activities ON events.activity_id = activities.id
      LEFT JOIN places ON places.id = events.place_id`;
      return super.read(text);
  }
}

module.exports = EventAttendee;
