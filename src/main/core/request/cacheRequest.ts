import { app } from 'electron';
import { ensureFileSync, existsSync, moveSync, readJsonSync, writeJSON } from 'fs-extra';
import path from 'path';

const CACHE_PATH = 'Api_Cache';
const url2path = (url: string, donotShowExt?: boolean) => {
  const filePath =
    (url.includes('?') ? path.join(url.split('?')[0], url.split('=')[1]) : url.split('.')[0]) +
    (donotShowExt ? '' : '.json');
  return path.join(app.getPath('userData'), CACHE_PATH, filePath);
};
export function cacheExists(url: string) {
  return existsSync(url2path(url));
}
export function readCache(url: string) {
  return readJsonSync(url2path(url));
}
export function writeCache(url: string, data, version) {
  if (cacheExists(url)) {
    const oldVersion = readCache(url).version;
    moveSync(url2path(url), url2path(url, false) + `_v${oldVersion}` + '.json');
  } else {
    ensureFileSync(url2path(url));
  }
  writeJSON(url2path(url), { version, data }, { spaces: 2 }, (e) => {
    if (e) throw e;
  });
}
