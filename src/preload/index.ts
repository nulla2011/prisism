import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { ElMessage } from 'element-plus';

// Custom APIs for renderer
const api = {
  getIdolInfo: (id) => ipcRenderer.invoke('getIdolInfo', id),
  clearCache: () => ipcRenderer.send('cache:clear'),
  // axiosError: (callback) => ipcRenderer.on('err:axios', callback),
  getAsset: (path) => ipcRenderer.invoke('getAsset', path),
};

ipcRenderer.on('version:asset:get', () => {
  ElMessage({ message: 'Getting asset version...', duration: 5000 });
});
ipcRenderer.on('version:db:get', () => {
  ElMessage({ message: 'Getting DB version...', duration: 5000 });
});
ipcRenderer.on('version:asset', (event, { assetVersion, isNew }) => {
  if (isNew) {
    ElMessage({
      message: `New asset version: ${assetVersion}`,
      type: 'success',
      duration: 10000,
    });
  } else {
    ElMessage({ message: `Asset version: ${assetVersion}`, duration: 5000 });
  }
});
ipcRenderer.on('version:db', (event, { dbVersion, isNew }) => {
  if (isNew) {
    ElMessage({
      message: `New DB version: ${dbVersion}`,
      type: 'success',
      duration: 10000,
    });
  } else {
    ElMessage({ message: `DB version: ${dbVersion}`, duration: 5000 });
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
