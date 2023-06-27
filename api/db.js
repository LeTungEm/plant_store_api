'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host:  "localhost",
  user:  "root",
  password:  "",
  database: "plant_store_api"
});

module.exports = db
