import {Menu} from "electron";
import {menubar} from "menubar";

export const createTray = trayPath => {
  const menubarOptions = {
    preloadWindow: true,
    index: trayPath,
    icon: 'app/build/iconTemplate.png'
  };

  const mb = menubar(menubarOptions);

  mb.on('ready', () => {
    const secondMenu = Menu.buildFromTemplate(
      [
        {
          label: 'Quit',
          click: _ => {
            mb.app.quit()
          },
          accelerator: 'CmdOrCtrl+Q'
        }
      ]
    );

    mb.tray.on('right-click', () => {
        mb.tray.popUpContextMenu(secondMenu);
      }
    )
  });
}
