const Table = require('./Table');

class Event extends Table {
  constructor(rawData={}) {
    const pk = 'id';
    const tableName = 'events';
    const ACCEPTED_FIELDS = ['id', 'name', 'description', 'activityid', 'placeid', 'datefrom', 'dateto', 'minpeople', 'maxpeople'];
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

  read() {
    const text = `SELECT events.id, events.name, events.description,
    activities.name as activity, places.country, places.city,
    events.datefrom, events.dateto, events.minpeople, events.maxpeople
    FROM ${this.tableName}
    LEFT JOIN activities ON activities.id = events.activityid
    LEFT JOIN places ON places.id = events.placeid`;
    return super.read(text);
  }
}

module.exports = Event;
