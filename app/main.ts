import { app, BrowserWindow, screen, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { createTray } from './tray/tray';
import { saveFileSelected } from './textToScript/models/utils';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
    },
  });

  let frontendPath: string;
  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    frontendPath = 'http://localhost:4200';
  } else {
    let indexPath = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      indexPath = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, indexPath));
    frontendPath = url.href;
  }


  win.on('closed', () => {
    win = null;
  });

  win.loadURL(frontendPath);
  createTray(frontendPath);

  return win;
}

try {
  app.on('ready', () => setTimeout(createWindow, 400));


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  throw e;
}

// listen from render to select file and save it
ipcMain.on('save-file', (event) => {
  saveFileSelected(event, dialog);
});
