import { ipcMain, BrowserWindow } from 'electron';
import request from './core/request';
import getAsset from './core/getAsset';

export default () => {
  ipcMain.handle('queryApi', async (event, type, queryValue) => {
    let url;
    switch (type) {
      case 'character':
        url = `character?id=${queryValue}`;
        break;
      case 'concertBgms':
        url = 'concertBgms.json';
        break;
      default:
        break;
    }
    let resp = await request(url).catch((e) => {
      throw e;
    });
    return resp;
  });
  ipcMain.on('cache:clear', () => {
    BrowserWindow.fromId(1)!.webContents.session.clearCache();
  });
  ipcMain.handle('getAsset', async (event, path, hash?) => {
    let resp = await getAsset(path, hash).catch((e) => {
      throw e;
    });
    return resp;
  });
};
