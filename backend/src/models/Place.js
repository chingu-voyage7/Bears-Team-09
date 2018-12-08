const Table = require('./Table');

class Place extends Table {
  constructor(data={}) {
    const pk = 'id';
    const tableName = 'places';
    const ACCEPTED_FIELDS = ['id', 'country', 'city'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }

  search() {
    return super.read('~', 'OR');
  }
}

module.exports = Place;
