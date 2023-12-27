import { utilityProcess, dialog, app } from 'electron';
import { join } from 'path';

export default () => {
  const serverProcess = utilityProcess.fork(join(__dirname, '../server/main.js'), [], {
    stdio: 'pipe',
    cwd: app.getPath('userData'),
  });
  serverProcess.on('spawn', () => {
    serverProcess.stdout?.on('data', (data) => {
      console.log(`[server process] ${data}`);
    });
    serverProcess.stderr?.on('data', (data) => {
      dialog.showErrorBox('error', data.toString().replace(/\u001B\[3[0-9;]*m/g, ''));
      console.error(`[server process] ${data}`);
    });
  });
};
