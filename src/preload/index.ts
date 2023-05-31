import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { message } from 'ant-design-vue';

// Custom APIs for renderer
const api = {
  getIdolInfo: (id) => ipcRenderer.invoke('getIdolInfo', id),
  clearCache: () => ipcRenderer.send('cache:clear'),
  // axiosError: (callback) => ipcRenderer.on('err:axios', callback),
  getAsset: (path) => ipcRenderer.invoke('getAsset', path),
};

ipcRenderer.on('version:asset:get', () => {
  message.loading({ content: 'Getting asset version...', key: 'version:asset' });
});
ipcRenderer.on('version:db:get', () => {
  message.loading({ content: 'Getting DB version...', key: 'version:db' });
});
ipcRenderer.on('version:asset', (event, { assetVersion, isNew }) => {
  if (isNew) {
    message.success({ content: `New asset version: ${assetVersion}`, key: 'version:asset' });
  } else {
    message.info({ content: `Asset version: ${assetVersion}`, key: 'version:asset' });
  }
});
ipcRenderer.on('version:db', (event, { dbVersion, isNew }) => {
  if (isNew) {
    message.success({ content: `New DB version: ${dbVersion}`, key: 'version:db' });
  } else {
    message.info({ content: `DB version: ${dbVersion}`, key: 'version:db' });
  }
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
