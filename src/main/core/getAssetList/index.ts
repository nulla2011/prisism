import { BrowserWindow } from 'electron';
import { Asset } from 'gxmb';

export default async (list: { string: number }[]) => {
  const { DB, appendDB, promisifiedDBRun } = await import('../../service/sqlite');
  DB.run('BEGIN TRANSACTION');
  BrowserWindow.fromId(1)!.webContents.send('DB:writing');
  let tasks: Promise<void>[] = [];
  for (let i = 0; i < list.length; i++) {
    const chunk = new Asset(Object.keys(list[i])[0]);
    chunk.hashUrl();
    tasks.push(
      chunk
        .fetchFile()
        .then(() => chunk.decodeFile())
        .then(() => JSON.parse(chunk.data as string))
        .then((data) => appendDB(DB, data)),
    );
  }
  await Promise.all(tasks)
    .then(() => promisifiedDBRun('COMMIT'))
    .then(() => BrowserWindow.fromId(1)!.webContents.send('DB:writeSuccess'))
    .catch((err) => {
      throw err;
    });
};
