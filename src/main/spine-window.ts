import { BrowserWindow } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

export default () => {
  const window = new BrowserWindow({
    minWidth: 1296,
    minHeight: 759,
    width: 1296,
    height: 759,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    title: 'prism',
    // webPreferences: {
    //   preload: join(__dirname, '../preload/index.js'),
    //   sandbox: false,
    // },
  });
  window.on('ready-to-show', () => {
    window.show();
  });
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/spine.html`);
  } else {
    window.loadFile(join(__dirname, '../renderer/spine.html'));
  }
};
