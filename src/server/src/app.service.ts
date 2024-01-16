import { Injectable } from '@nestjs/common';
import { Asset, assets } from 'gxmb';
import { resolve } from 'path';
import { outputFile, pathExistsSync, readFileSync } from 'fs-extra';

@Injectable()
export class AppService {
  async getAsset(path: string, hash?: string) {
    const filePath = resolve('Assets', path);
    if (pathExistsSync(filePath)) {
      return readFileSync(filePath);
    } else {
      const asset = new Asset(path);
      if (hash) {
        asset.getHash(() => hash);
      }
      asset.hashUrl();
      await asset.fetchFile();
      if (asset.ext === assets.fileType.json || asset.ext === assets.fileType.atlas) {
        await asset.decodeFile();
      }
      outputFile(filePath, asset.data);
      return asset.data;
    }
  }
}
