const Table = require("./Table");

class Activity extends Table {
  constructor(rawData = {}) {
    const pk = "id";
    const tableName = "activities";
    const ACCEPTED_FIELDS = ["id", "name"];
    const cleanData = {};
    Object.keys(rawData).forEach(key => {
      if (ACCEPTED_FIELDS.includes(key)) {
        cleanData[key] = rawData[key];
      }
    });
    super(tableName, pk, cleanData);
    this.ACCEPTED_FIELDS = ACCEPTED_FIELDS;
    this.REQUIRED_FIELDS = ["name"];
    this.parseOpts(rawData);
  }
}

module.exports = Activity;
