import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';

const dbFlie = path.join(app.getPath('userData'), 'assets.db');
export const DB = new sqlite3.Database(dbFlie, (err) => {
  if (err) {
    throw new Error(err?.message);
  }
});
export const initDB = () => {
  return new Promise<void>((resolve, reject) => {
    DB.run(
      'CREATE TABLE IF NOT EXISTS assets ( id INTEGER PRIMARY KEY, name VARCHAR (120) NOT NULL, ver TINYINT (3) NOT NULL DEFAULT 0)',
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
