import { Asset, URL_PREFIX, hashFileName } from '@nulla/prism-core';
import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import path from 'path';

const ASSET_MAP = 'asset-map.json';
const getVersion = async () => {
  BrowserWindow.fromId(1)!.webContents.send('getVersion');
  let assetMap = new Asset(ASSET_MAP);
  assetMap.fixUrl(URL_PREFIX + ASSET_MAP.replace('.json', '') + '-' + hashFileName(ASSET_MAP));
  await assetMap.fetchFile();
  await assetMap.decodeFile();
  let map = JSON.parse(assetMap.data as string);
  return Number(map.version);
};
export default async () => {
  const versionFile = path.join(app.getPath('userData'), 'asset-version');
  let oldVersion = fs.existsSync(versionFile) ? Number(fs.readFileSync(versionFile, 'utf-8')) : 0;
  let version = await getVersion();
  if (oldVersion !== version) {
    BrowserWindow.fromId(1)!.webContents.send('newVersion', version);
    fs.writeFileSync(versionFile, version.toString(), 'utf-8');
  }
};
