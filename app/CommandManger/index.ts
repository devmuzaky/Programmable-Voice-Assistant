import {FileManager} from "./file-manger";

const fileManager = new FileManager("test-files");

export const saveCommandExecutable = (command_id, command_name, executable_url) => {
  fileManager.createFile(command_name + '.exe', executable_url).then((path) => {
    console.log('executable saved at: ' + path);
    // TODO: store in db
  });
}
