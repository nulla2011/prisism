import { Asset, assets } from 'gxmb';

export default async (path: string, hash?: string) => {
  let asset = new Asset(path);
  if (hash) {
    asset.getHash(() => hash);
  }
  asset.hashUrl();
  await asset.fetchFile().catch((e) => {
    throw e;
  });
  if (asset.ext === assets.fileType.json || asset.ext === assets.fileType.atlas) {
    await asset.decodeFile();
  }
  return asset.data;
};
