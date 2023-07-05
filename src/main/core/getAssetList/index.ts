import { Asset } from 'gxmb';

export default async (list: { string: number }[]) => {
  const { DB, appendDB } = await import('../../service/sqlite');
  DB.run('BEGIN TRANSACTION');
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
    .then(() =>
      DB.run('COMMIT', (err) => {
        if (err) {
          throw err;
        }
      }),
    )
    .catch((err) => {
      throw err;
    });
};
