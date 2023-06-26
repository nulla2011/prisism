import { Asset } from 'gxmb';

export default async (list: { string: number }[]) => {
  let tasks: Promise<void> = [];
  for (let i = 0; i < list.length; i++) {
    const chunk = new Asset(Object.keys(list[i])[0]);
    chunk.getUrl();
    tasks.push(chunk.fetchFile());
  }
};
