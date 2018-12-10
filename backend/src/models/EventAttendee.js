const Table = require('./Table');

class EventAttendee extends Table {
  constructor(data={}) {
    const pk = 'id';
    const tableName = 'event_attendees';
    const ACCEPTED_FIELDS = ['id', 'eventid', 'userid'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }

  getAllAttendees() {
    const text = `
      SELECT users.id, users.firstname, users.lastname, users.bio FROM users
      INNER JOIN ${this.tableName} ON users.id = ${this.tableName}.userid`;
    return super.read('=', 'AND', text);
  }

  getAllEvents() {
    const text = `SELECT events.id, events.name, events.description,
      activities.name as activity, places.country, places.city,
      events.datefrom, events.dateto, events.minpeople, events.maxpeople FROM events
      INNER JOIN ${this.tableName} ON events.id = ${this.tableName}.eventid
      INNER JOIN activities ON events.activityid = activities.id
      LEFT JOIN places ON places.id = events.placeid`;
      return super.read('=', 'AND', text);
  }
}

module.exports = EventAttendee;
