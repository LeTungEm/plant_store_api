'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host:  "localhost",
  user:  "id19881996_letungem",
  password:  "Tung2132001_",
  database: "id19881996_plant_store_api"
});

module.exports = db
