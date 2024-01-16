import { api } from 'gxmb';
import { cacheExists, readCache, writeCache } from './cacheRequest';

export default async (method: string, url: string) => {
  if (cacheExists(url)) {
    const cache = readCache(url);
    if (!global.apiVersion || cache.version == global.apiVersion.version) {
      return cache.data;
    }
  }
  const resp = await api
    .sendRequest(method, url, global.apiVersion)
    .then((data) => JSON.parse(data));
  if (resp) writeCache(url, resp, global.apiVersion.version);
  return resp;
};
