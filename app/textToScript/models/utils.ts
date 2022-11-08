import * as fs from 'fs';
import * as path from 'path';
import { Notification } from 'electron';
import { getQueryData, runQuery } from './query';

export const saveFileSelected = (event, dialog) => {
  dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Script', extensions: ['js', 'py', 'sh'] }],
    })
    .then(async (files) => {
      if (!files.canceled) {
        // get filepath, name, extension and file content.
        const filePath = files.filePaths[0];
        const name = path.basename(filePath);
        const ext = path.extname(filePath);
        const script = fs.readFileSync(filePath).toString();

        // save it in database
        try {
          const query = `INSERT INTO scripts(name, content, extension) VALUES (?, ?, ?)`;
          const prams = [name, script, ext];
          const response = await runQuery(query, prams);
          showNotification('Upload', 'Script Uploaded ✔');

          const allScripts = await getQueryData('SELECT * FROM scripts', []);
          event.sender.send('selected-file', allScripts);
        } catch (e) {
          console.log(e);
          showNotification('ERROR', 'IN Run query');
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const showNotification = (title: string, body: string) => {
  new Notification({
    title: title,
    body: body,
  }).show();
};
