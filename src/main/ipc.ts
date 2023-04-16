import { ipcMain } from 'electron';
import request from './core/request';
import { sleep } from './utils';

export default () => {
  ipcMain.handle('getIdolInfo', async (event, id) => {
    let resp = await request(`character?id=${id}`);
    return resp;
  });
};
