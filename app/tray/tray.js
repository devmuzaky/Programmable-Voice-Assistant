"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTray = void 0;
const electron_1 = require("electron");
const menubar_1 = require("menubar");
const createTray = trayPath => {
    const menubarOptions = {
        preloadWindow: true,
        index: trayPath,
        icon: 'app/build/iconTemplate.png'
    };
    const mb = (0, menubar_1.menubar)(menubarOptions);
    mb.on('ready', () => {
        const secondMenu = electron_1.Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: _ => {
                    mb.app.quit();
                },
                accelerator: 'CmdOrCtrl+Q'
            }
        ]);
        mb.tray.on('right-click', () => {
            mb.tray.popUpContextMenu(secondMenu);
        });
    });
};
exports.createTray = createTray;
//# sourceMappingURL=tray.js.map