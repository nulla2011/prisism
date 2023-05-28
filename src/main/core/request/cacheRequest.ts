import { app } from 'electron';
import { existsSync, mkdirSync, readFileSync, writeFile } from 'fs';
import path from 'path';

const CACHE_PATH = 'request_cache';
const url2path = (url: string) => {
  return path.join(
    app.getPath('userData'),
    CACHE_PATH,
    url.split('?')[0],
    url.split('=')[1] + '.json',
  );
};
export function cacheExist(url: string) {
  return existsSync(url2path(url));
}
export function readCache(url: string) {
  return JSON.parse(readFileSync(url2path(url), 'utf-8'));
}
export function writeCache(url: string, data, version) {
  if (!existsSync(path.dirname(url2path(url)))) {
    mkdirSync(path.dirname(url2path(url)), { recursive: true });
  }
  writeFile(url2path(url), JSON.stringify({ version, data }, null, 2), 'utf-8', (e) => {
    if (e) throw e;
  });
}
