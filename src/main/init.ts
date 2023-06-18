import { Asset, ASSETS_URL_PREFIX, hashFileName, getApiVersion } from 'gxmb';
import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import path from 'path';
import request from './service/axios';

const ASSET_MAP = 'asset-map.json';
const getAssetVersion = async () => {
  BrowserWindow.fromId(1)!.webContents.send('version:asset:get');
  let assetMap = new Asset(ASSET_MAP);
  assetMap.fixUrl(
    ASSETS_URL_PREFIX + ASSET_MAP.replace('.json', '') + '-' + hashFileName(ASSET_MAP),
  );
  await assetMap.fetchFile();
  await assetMap.decodeFile();
  let map = JSON.parse(assetMap.data as string);
  return Number(map.version);
};
const getApiAndEmVersion = async () => {
  BrowserWindow.fromId(1)!.webContents.send('version:api:get');
  const { version, em_version } = await getApiVersion();
  global.apiVersion = version;
  global.emVersion = em_version;
};
export default async () => {
  const assetVersionFile = path.join(app.getPath('userData'), 'asset-version');
  const apiVersionFile = path.join(app.getPath('userData'), 'api-version');
  let oldAssetVersion = fs.existsSync(assetVersionFile)
    ? Number(fs.readFileSync(assetVersionFile, 'utf-8'))
    : 0;
  let oldApiVersion = fs.existsSync(apiVersionFile)
    ? Number(fs.readFileSync(apiVersionFile, 'utf-8'))
    : 0;
  let assetVersion = await getAssetVersion();
  await getApiAndEmVersion();
  let isAssetNew = oldAssetVersion !== assetVersion;
  BrowserWindow.fromId(1)!.webContents.send('version:asset', { assetVersion, isNew: isAssetNew });
  if (isAssetNew) fs.writeFileSync(assetVersionFile, assetVersion.toString(), 'utf-8');
  let isApiNew = oldApiVersion !== global.apiVersion;
  BrowserWindow.fromId(1)!.webContents.send('version:api', {
    apiVersion: global.apiVersion,
    isNew: isApiNew,
  });
  if (isApiNew) fs.writeFileSync(apiVersionFile, global.apiVersion.toString(), 'utf-8');
};
