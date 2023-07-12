import {app, BrowserWindow, screen, ipcMain, dialog} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import {createTray} from './tray/tray';
import {saveFileSelected} from './textToScript/models/utils';
import {googleStt, sttInit} from "./stt/googleStt";
import {googleTts, ttsInit} from "./tts/googleTts";
import {runScript} from "./scriptRunner/scriptRunner";
import {deleteCommandExecutable, saveCommandExecutable} from "./CommandManger";
import {google} from "googleapis";

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
      contextIsolation: false
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
  // TODO: in build, this url is not valid
  //  add an env variable to let the frontend know if it is the tray or the main window
  createTray(frontendPath + '/tray', serve);

  win.setMenuBarVisibility(false);


  // TODO: remove this line: it drop and recreate the tables
  // sequelize.sync();

  sttInit();
  ttsInit();

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

ipcMain.on('save-file', (event) => {
  saveFileSelected(event, dialog);
});


ipcMain.on('stt', googleStt);

ipcMain.on('tts', googleTts);

ipcMain.on('run-script', (event, scriptName, args) => {
  runScript(scriptName, args, event);
});

ipcMain.on('save_executable', (event, command_id, command_name, executable_url) => {
  saveCommandExecutable(command_id, command_name, executable_url);
});

ipcMain.on('delete-executable-file', (event, command_id) => {
  deleteCommandExecutable(command_id);
});

ipcMain.on('add-google-token', (event, code) => {
  // TODO: remove the old token file
  const oAuth2Client = new google.auth.OAuth2(
    "412397975040-34od6dhsn56ktgkmb4tljiql397k89as.apps.googleusercontent.com",
    "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",
    "urn:ietf:wg:oauth:2.0:oob"
  );

  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      return console.error('Error retrieving access token', err);
    }
    oAuth2Client.setCredentials(token);
    try {
      fs.writeFileSync("token.json", JSON.stringify(token));
    //   TODO: add next to the .exe too, if the first didn't work
    } catch (err) {
      return console.error(err);
    }
  });
});

ipcMain.on('get-token-url', (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    "412397975040-34od6dhsn56ktgkmb4tljiql397k89as.apps.googleusercontent.com",
    "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",
    "urn:ietf:wg:oauth:2.0:oob"
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/calendar',
    ],
  });

  event.reply(`get-token-url-replay`, authUrl)
});
