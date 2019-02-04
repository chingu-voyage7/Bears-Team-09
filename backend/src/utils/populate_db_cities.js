// DB Population script, use settings from ../models/db.js
const db = require('../models/db');
const importedValues = require('./worldcities1000');

db.query(`INSERT INTO places (city, country) VALUES ${importedValues}`).then(console.log).catch(console.log);
