import {FileManager} from "./file-manger";
import {createCommand} from "../DB/queries/command-repository";

const fileManager = new FileManager("test-files");

export const saveCommandExecutable = (command_id, command_name, executable_url) => {
  fileManager.createFile(command_id + '.exe', executable_url).then((path) => {
    createCommand(command_id, command_name, path).then(() => {
      console.log('command saved to the db');
    });
  });
}
