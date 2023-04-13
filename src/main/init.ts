import { Asset, URL_PREFIX, hashFileName } from '@nulla/prism-core';
import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import path from 'path';
import request from './service/axios';

const ASSET_MAP = 'asset-map.json';
const getAssetVersion = async () => {
  BrowserWindow.fromId(1)!.webContents.send('version:asset:get');
  let assetMap = new Asset(ASSET_MAP);
  assetMap.fixUrl(URL_PREFIX + ASSET_MAP.replace('.json', '') + '-' + hashFileName(ASSET_MAP));
  await assetMap.fetchFile();
  await assetMap.decodeFile();
  let map = JSON.parse(assetMap.data as string);
  return Number(map.version);
};
const getDBVersion = async () => {
  BrowserWindow.fromId(1)!.webContents.send('version:db:get');
  global.dbVersion = await request(import.meta.env['MAIN_VITE_DB_VERSION_URL']);
};
export default async () => {
  const assetVersionFile = path.join(app.getPath('userData'), 'asset-version');
  const dbVersionFile = path.join(app.getPath('userData'), 'db-version');
  let oldAssetVersion = fs.existsSync(assetVersionFile)
    ? Number(fs.readFileSync(assetVersionFile, 'utf-8'))
    : 0;
  let oldDBVersion = fs.existsSync(dbVersionFile)
    ? Number(fs.readFileSync(dbVersionFile, 'utf-8'))
    : 0;
  let assetVersion = await getAssetVersion();
  await getDBVersion();
  let isAssetNew = oldAssetVersion !== assetVersion;
  BrowserWindow.fromId(1)!.webContents.send('version:asset', { assetVersion, isNew: isAssetNew });
  if (isAssetNew) fs.writeFileSync(assetVersionFile, assetVersion.toString(), 'utf-8');
  let isDBNew = oldDBVersion !== global.dbVersion;
  BrowserWindow.fromId(1)!.webContents.send('version:db', {
    dbVersion: global.dbVersion,
    isNew: isDBNew,
  });
  if (isDBNew) fs.writeFileSync(dbVersionFile, global.dbVersion.toString(), 'utf-8');
};
