const Table = require("./Table");

class Place extends Table {
  constructor(rawData = {}) {
    const pk = "id";
    const tableName = "places";
    const ACCEPTED_FIELDS = ["id", "country", "city"];
    const cleanData = {};
    Object.keys(rawData).forEach(key => {
      if (ACCEPTED_FIELDS.includes(key)) {
        cleanData[key] = rawData[key];
      }
    });
    super(tableName, pk, cleanData);
    this.ACCEPTED_FIELDS = ACCEPTED_FIELDS;
    this.REQUIRED_FIELDS = ["country", "city"];
    this.parseOpts(rawData);
  }
}

module.exports = Place;
