// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron';
import isDev from 'electron-is-dev';

const height = 600;
const width = 800;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width: width,
    height: height,
    frame: true,
    show: true,
    resizable: true,
    fullscreenable: true
  });
  isDev ? window?.loadURL(`http://localhost:3005`) : window?.loadFile(join(__dirname, '../out/index.html'));

  // Open the DevTools.
  // window.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
