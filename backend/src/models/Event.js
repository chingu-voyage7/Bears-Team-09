const Table = require('./Table');

class Event extends Table {
  constructor(data={}) {
    const pk = 'id';
    const tableName = 'events';
    const ACCEPTED_FIELDS = ['id', 'name', 'description', 'activityid', 'placeid', 'datefrom', 'dateto', 'minpeople', 'maxpeople'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }

  read(compareOperator='=', logicalOperator='AND') {
    const text = `SELECT events.id, events.name, events.description,
    activities.name as activity, places.country, places.city,
    events.datefrom, events.dateto, events.minpeople, events.maxpeople
    FROM ${this.tableName}
    LEFT JOIN activities ON activities.id = events.activityid
    LEFT JOIN places ON places.id = events.placeid`;
    return super.read(compareOperator, logicalOperator, text);
  }
}

module.exports = Event;
