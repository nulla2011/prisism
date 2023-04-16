import axios from '../service/axios';
import { cacheExist, readCache, writeCache } from './cacheRequest';

export default async (url: string) => {
  if (cacheExist(url)) {
    let cache = readCache(url);
    if (!global.dbVersion || cache.version == global.dbVersion) {
      return cache.data;
    }
  }
  let resp = await axios(url);
  writeCache(url, resp, global.dbVersion);
  return resp;
};
