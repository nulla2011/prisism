import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { message } from 'ant-design-vue';

// Custom APIs for renderer
const api = {
  getIdolInfo: (id) => ipcRenderer.invoke('queryApi', 'character', id),
  getConcertBgms: () => ipcRenderer.invoke('queryApi', 'concertBgms'),
  clearCache: () => ipcRenderer.send('cache:clear'),
  // axiosError: (callback) => ipcRenderer.on('err:axios', callback),
  getAsset: (path, hash?) => ipcRenderer.invoke('getAsset', path, hash),
  queryDB: (string) => ipcRenderer.invoke('DB:queryName', string),
  openSpineView: (type, id) => ipcRenderer.send('window:SpineView', type, id),
  queryHash: (category, id) => ipcRenderer.invoke('queryHash', category, id),
};

ipcRenderer.on('version:asset:get', () => {
  message.loading({ content: 'Getting Asset Version...', key: 'version:asset' });
});
ipcRenderer.on('version:api:get', () => {
  message.loading({ content: 'Getting Api Version...', key: 'version:api' });
});
ipcRenderer.on('version:asset', (event, { assetVersion, isNew }) => {
  if (isNew) {
    message.success({
      content: `New Asset Version: ${assetVersion}, fetching...`,
      key: 'version:asset',
    });
  } else {
    message.info({ content: `Asset Version: ${assetVersion}`, key: 'version:asset' });
  }
});
ipcRenderer.on('version:api', (event, { apiVersion, isNew }) => {
  if (isNew) {
    message.success({ content: `New Api Version: ${apiVersion}`, key: 'version:api' });
  } else {
    message.info({ content: `Api Version: ${apiVersion}`, key: 'version:api' });
  }
});
ipcRenderer.on('DB:writing', () => {
  message.loading({ content: 'Writing DB...', key: 'DB:write' });
});
ipcRenderer.on('DB:writeSuccess', () => {
  message.success({ content: 'Write DB success!', key: 'DB:write' });
});

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
