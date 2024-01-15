import { ipcMain, BrowserWindow } from 'electron';
import request from './core/request';
import getAsset from './core/getAsset';
import createSpineWindow from './spine-window';
import queryHash from './core/queryHash';

ipcMain.handle('queryApi', async (event, type, queryValue) => {
  let url;
  let method;
  switch (type) {
    case 'character':
      url = `/characterAlbums/characters/${queryValue}`;
      method = 'POST';
      break;
    case 'concertBgms':
      url = '/concertBgms?isAll=true';
      method = 'GET';
      break;
    default:
      break;
  }
  const resp = await request(method, url).catch((e) => {
    throw e;
  });
  return resp;
});
ipcMain.on('cache:clear', () => {
  BrowserWindow.fromId(1)!.webContents.session.clearCache();
});
ipcMain.handle('getAsset', async (event, path, hash?) => {
  const resp = await getAsset(path, hash).catch((e) => {
    throw e;
  });
  return resp;
});
ipcMain.handle('DB:queryName', async (event, string) => {
  const { DB, queryDB } = await import('./service/sqlite');
  const result = await queryDB(DB, string).catch((e) => {
    throw e;
  });
  return result.map((line) => line.name);
});
ipcMain.on('window:SpineView', (event, type, id) => {
  createSpineWindow(type, id);
});
ipcMain.handle('queryHash', (event, category, id) => {
  return queryHash(category, id);
});
