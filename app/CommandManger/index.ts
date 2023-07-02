import {FileManager} from "./file-manger";
import {createCommand, deleteCommand} from "../DB/queries/command-repository";

const fileManager = new FileManager("test-files");

export const saveCommandExecutable = (command_id, command_name, executable_url) => {
  fileManager.createFile(command_id + '.exe', executable_url).then((path) => {
    createCommand(command_id, command_name, path).then(() => {
      console.log('command saved to the db');
    });
  });
}

export const deleteCommandExecutable = (command_id) => {
  fileManager.removeFile(command_id + '.exe').then(() => {
    deleteCommand(command_id).then(() => {
      console.log('command deleted from the db')
    });
  });
}
