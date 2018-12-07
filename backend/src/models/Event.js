const db = require('./db');
const Table = require('./Table');

class Event extends Table {
  constructor(data={}) {
    const pk = 'id';
    const tableName = 'events';
    const ACCEPTED_FIELDS = ['id', 'name', 'description', 'activity', 'place', 'date_from', 'date_to', 'minpeople', 'maxpeople'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }

  read(useAND=true, operator='=') {
    const SEARCH_OPERATORS = {
      '=': '=',
      '~': '~',
      '>': '>',
      '<': '<',
      'LIKE': 'LIKE'
    };
    let text = `SELECT events.id, events.name, events.description,
    activities.name as activity, places.country, places.city,
    events.date_from, events.date_to, events.minpeople, events.maxpeople
    FROM ${this.tableName}
    LEFT JOIN activities ON activities.id = events.activity
    LEFT JOIN places ON places.id = events.place`;
    let values = [];
    if (Object.keys(this.data).length !== 0) {
      const op = SEARCH_OPERATORS[operator] || '=';
      let i = 1;
      const searchCriterias = Object.keys(this.data).reduce((acc, key) => {
        acc.text.push(`events.${key} ${op} $${i++}`);
        acc.values.push(this.data[key]);
        return acc;
      }, {text: [], values: []});
      text += ` WHERE ${searchCriterias.text.join(` ${useAND ? 'AND' : 'OR'} `)}`;
      ({values} = searchCriterias);
    };
    return db.query(text, values);
  }
}


module.exports = Event;
