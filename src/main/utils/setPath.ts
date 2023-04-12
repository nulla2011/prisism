import { app } from 'electron';
import { join } from 'path';
import packagejson from '../../../package.json' assert { type: 'json' };

export default () => {
  app.setPath('userData', join(app.getPath('appData'), packagejson.author, packagejson.name));
};
