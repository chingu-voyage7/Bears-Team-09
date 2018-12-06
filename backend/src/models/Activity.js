const Table = require('./Table');

class Activity extends Table {
  constructor(data={}) {
    const pk = 'id';
    const tableName = 'activities';
    const ACCEPTED_FIELDS = ['id', 'name'];
    Object.keys(data).forEach(key => {
      if (!ACCEPTED_FIELDS.includes(key)) {
            delete data[key];
        }
    });
    super(tableName, pk, data);
  }

  read() {
    return super.read(this.data);
  }

  search() {
    return super.read(this.data, false, '~');
  }
}

module.exports = Activity;
