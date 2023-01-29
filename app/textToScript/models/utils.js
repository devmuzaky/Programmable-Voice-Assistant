"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNotification = exports.saveFileSelected = void 0;
const fs = require("fs");
const path = require("path");
const electron_1 = require("electron");
const query_1 = require("./query");
const saveFileSelected = (event, dialog) => {
    dialog
        .showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Script', extensions: ['js', 'py', 'sh'] }],
    })
        .then((files) => __awaiter(void 0, void 0, void 0, function* () {
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
                const response = yield (0, query_1.runQuery)(query, prams);
                (0, exports.showNotification)('Upload', 'Script Uploaded ✔');
                const allScripts = yield (0, query_1.getQueryData)('SELECT * FROM scripts', []);
                event.sender.send('selected-file', allScripts);
            }
            catch (e) {
                console.log(e);
                (0, exports.showNotification)('ERROR', 'IN Run query');
            }
        }
    }))
        .catch((error) => {
        console.log(error);
    });
};
exports.saveFileSelected = saveFileSelected;
const showNotification = (title, body) => {
    new electron_1.Notification({
        title: title,
        body: body,
    }).show();
};
exports.showNotification = showNotification;
//# sourceMappingURL=utils.js.map