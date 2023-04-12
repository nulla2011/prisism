import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { ElMessage } from 'element-plus';

// Custom APIs for renderer
const api = {};

ipcRenderer.on('getVersion', () => {
  ElMessage({ message: 'Getting version...', duration: 5000 });
});
ipcRenderer.on('newVersion', (event, version) => {
  ElMessage({
    message: `New asset version ${version}`,
    type: 'success',
    duration: 10000,
  });
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
