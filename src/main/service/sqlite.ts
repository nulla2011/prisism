import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';

const dbFlie = path.join(app.getPath('userData'), 'assets.db');
export const DB = new sqlite3.Database(dbFlie, (err) => {
  if (err) {
    throw err;
  }
});
export const initDB = () => {
  return new Promise<void>((resolve, reject) => {
    DB.run(
      'CREATE TABLE IF NOT EXISTS assets ( id INTEGER PRIMARY KEY, name VARCHAR (120) NOT NULL, version TINYINT (3) NOT NULL DEFAULT 0)',
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};
export const appendDB = (db: sqlite3.Database, data: { [key: string]: number }) => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      const statement = db.prepare('INSERT INTO assets (name, version) VALUES (?, ?)');
      for (const entry of Object.entries(data)) {
        statement.run(entry);
      }
      statement.finalize((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
};
