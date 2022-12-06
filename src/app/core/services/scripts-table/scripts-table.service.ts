import {Injectable} from '@angular/core';

import {ScriptData} from "../../interfaces/script-data";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ScriptsTableService {

scripts: ScriptData[] = [
  {
    name: 'Script 1',
    command: 'Command 1',
    picture: 'Picture 1',
    description: 'Description 1',
    parameters: 'Parameters 1',
    status: 'Status 1'
  },
  {
    name: 'Script 2',
    command: 'Command 2',
    picture: 'Picture 2',
    description: 'Description 2',
    parameters: 'Parameters 2',
    status: 'Status 2'
  },
  {
    name: 'Script 3',
    command: 'Command 3',
    picture: 'Picture 3',
    description: 'Description 3',
    parameters: 'Parameters 3',
    status: 'Status 3'
  }
];



  constructor() {
  }

  getScripts() {
    return this.scripts;
  }
}
