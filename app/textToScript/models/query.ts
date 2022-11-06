// This file connects the database and list of query functions.

import * as path from 'path';
const sqlite3 = require('sqlite3').verbose();
let sql: string;

// connect to database
const url = path.join(__dirname, '../scripts.db');
const db = new sqlite3.Database(url, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log(err);
  else console.log('Database Connection completed...');
});

// To create table...
// sql = `
//   CREATE TABLE scripts(
//     name TEXT NOT NULL,
//     content TEXT NOT NULL,
//     extension TEXT NOT NULL,
//     hasParameter INTEGER DEFAULT 0,
//     parameters TEXT
//   );
// `;
// db.run(sql)

// any query: insert/delete/update
export const runQuery = (query: string, prams: string[]) => {
  return new Promise(function (resolve, reject) {
    db.run(query, prams, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};

// get data
export const getQueryData = (query: string, prams: string[]) => {
  return new Promise((resolve, reject) => {
    db.all(query, prams, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

