"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScripts = exports.getQueryData = exports.runQuery = void 0;
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
let sql;
// connect to database
const url = path.join(__dirname, '../scripts.db');
const db = new sqlite3.Database(url, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        console.log(err);
    else
        console.log('Database Connection completed...');
});
// enable foreign key constraint.
db.get('PRAGMA foreign_keys = ON;');
// create table scripts (done ✔)
// sql = `
//   CREATE TABLE scripts(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     commandId INTEGER,
//     name TEXT NOT NULL,
//     content TEXT NOT NULL,
//     extension TEXT NOT NULL,
//     hasParameter INTEGER DEFAULT 0,
//     parameters TEXT,
//     FOREIGN KEY (commandId) REFERENCES commands (commandId) ON DELETE CASCADE ON UPDATE NO ACTION
//   );
// `;
// create table commands (done ✔)
// sql = `
//   CREATE TABLE commands(
//     commandId INTEGER PRIMARY KEY AUTOINCREMENT,
//     phrase TEXT NOT NULL UNIQUE
//   );
// `;
// db.run(sql);
// any query: insert/delete/update
const runQuery = (query, prams) => {
    return new Promise(function (resolve, reject) {
        db.run(query, prams, (err) => {
            if (err)
                reject(err);
            resolve(true);
        });
    });
};
exports.runQuery = runQuery;
// get data
const getQueryData = (query, prams) => {
    return new Promise((resolve, reject) => {
        db.all(query, prams, (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
};
exports.getQueryData = getQueryData;
// get scripts for a specific command.
const getScripts = (command) => {
    const query = `
  SELECT content
  FROM scripts as sc, commands as cmd
  WHERE sc.commandId = cmd.commandId
  AND phrase = ?
  `;
    return new Promise((resolve, reject) => {
        db.all(query, command, (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
};
exports.getScripts = getScripts;
//# sourceMappingURL=query.js.map