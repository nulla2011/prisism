import { Asset, ASSETS_URL_PREFIX, hashFileName, getApiVersion } from 'gxmb';
import { app, BrowserWindow } from 'electron';
import { existsSync, readFileSync, outputFileSync } from 'fs-extra';
import path from 'path';
import getAssetList from './core/getAssetList';
import request from './core/request';
import { cacheExists, readCache } from './core/request/cacheRequest';

const ASSET_MAP = 'asset-map.json';
const getAssetMap = async () => {
  BrowserWindow.fromId(1)!.webContents.send('version:asset:get');
  const assetMap = new Asset(ASSET_MAP);
  assetMap.fixUrl(
    ASSETS_URL_PREFIX + ASSET_MAP.replace('.json', '') + '-' + hashFileName(ASSET_MAP),
  );
  await assetMap.fetchFile();
  await assetMap.decodeFile();
  return JSON.parse(assetMap.data as string);
};
const getApiAndEmVersion = async () => {
  BrowserWindow.fromId(1)!.webContents.send('version:api:get');
  global.apiVersion = await getApiVersion();
};
export default async () => {
  const assetVersionFile = path.join(app.getPath('userData'), 'asset-version');
  const apiVersionFile = path.join(app.getPath('userData'), 'api-version');
  const oldAssetVersion = existsSync(assetVersionFile)
    ? Number(readFileSync(assetVersionFile, 'utf-8'))
    : 0;
  const oldApiVersion = existsSync(apiVersionFile) ? readFileSync(apiVersionFile, 'utf-8') : '0';
  let needHash = false;
  if (cacheExists('/hashResources')) {
    global.hashResources = readCache('/hashResources').data;
  } else {
    needHash = true;
  }
  const { DB, promisifiedDBRun, initTable } = await import('./service/sqlite');
  // global.DB = DB;
  await getApiAndEmVersion();
  const isApiNew = oldApiVersion !== global.apiVersion.version;
  BrowserWindow.fromId(1)!.webContents.send('version:api', {
    apiVersion: global.apiVersion.version,
    isNew: isApiNew,
  });
  if (isApiNew) {
    outputFileSync(apiVersionFile, global.apiVersion.version, 'utf-8');
    needHash = true;
  }
  if (needHash) {
    request('GET', '/hashResources').then((res) => (global.hashResources = res));
  }
  const [assetVersion, chunks] = await getAssetMap().then((map) => {
    return [map.version, map.chunks];
  });
  const isAssetNew = oldAssetVersion !== assetVersion;
  BrowserWindow.fromId(1)!.webContents.send('version:asset', { assetVersion, isNew: isAssetNew });
  global.assetVersion = assetVersion;
  if (isAssetNew) {
    outputFileSync(assetVersionFile, assetVersion.toString(), 'utf-8');
    promisifiedDBRun('DROP TABLE IF EXISTS assets')
      .then(() => initTable())
      .then(() => getAssetList(chunks))
      .catch((e) => console.error(e));
  } else {
    initTable();
  }
};
