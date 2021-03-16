"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const height = 600;
const width = 800;
function createWindow() {
    // Create the browser window.
    const window = new electron_1.BrowserWindow({
        width: width,
        height: height,
        frame: true,
        show: true,
        resizable: true,
        fullscreenable: true
    });
    electron_is_dev_1.default ? window?.loadURL(`http://localhost:3005`) : window?.loadFile(path_1.join(__dirname, '../out/index.html'));
    // Open the DevTools.
    // window.webContents.openDevTools();
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.ipcMain.on('message', (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
