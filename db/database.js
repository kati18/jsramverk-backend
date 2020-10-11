"use strict";

// Imports the sqlite3 module:
const sqlite3 = require('sqlite3').verbose();
// Creates a database object and opens the database connection automatically:
const db1 = new sqlite3.Database('./db/texts.sqlite');
