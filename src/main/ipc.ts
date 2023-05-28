import { ipcMain, BrowserWindow } from 'electron';
import request from './core/request';
import getAsset from './core/getAsset';

export default () => {
  ipcMain.handle('getIdolInfo', async (event, id) => {
    let resp = await request(`character?id=${id}`).catch((e) => {
      throw e;
    });
    return resp;
  });
  ipcMain.on('cache:clear', () => {
    BrowserWindow.fromId(1)!.webContents.session.clearCache();
  });
  ipcMain.handle('getAsset', async (event, path) => {
    let resp = await getAsset(path).catch((e) => {
      throw e;
    });
    return resp;
  });
};
