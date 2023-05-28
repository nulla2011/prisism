import { Asset, assets } from '@nulla/prism-core';

export default async (path: string) => {
  let asset = new Asset(path);
  //todo: get hash
  asset.getUrl();
  await asset.fetchFile().catch((e) => {
    throw e;
  });
  if (asset.ext === assets.fileType.json || asset.ext === assets.fileType.atlas) {
    await asset.decodeFile();
  }
  return asset.data;
};
