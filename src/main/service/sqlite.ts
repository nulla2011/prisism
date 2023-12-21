import sqlite3 from 'sqlite3';
import path, { resolve } from 'path';
import { app } from 'electron';

const dbFlie = path.join(app.getPath('userData'), 'assets.db');
export const DB = new sqlite3.Database(dbFlie, (err) => {
  if (err) {
    throw err;
  }
});
export const promisifiedDBRun = (command: string) => {
  return new Promise<void>((resolve, reject) => {
    DB.run(command, (err) => (err ? reject(err) : resolve()));
  });
};
export const initTable = async () => {
  await promisifiedDBRun(
    'CREATE TABLE IF NOT EXISTS assets ( id INTEGER PRIMARY KEY, name VARCHAR (120) NOT NULL, version TINYINT (3) NOT NULL DEFAULT 0)',
  );
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
export const queryDB = (db: sqlite3.Database, string: string) => {
  return new Promise<Record<string, any>[]>((resolve, reject) => {
    db.all(`SELECT name FROM assets WHERE name LIKE '${string}'`, (err, rows: any) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};
