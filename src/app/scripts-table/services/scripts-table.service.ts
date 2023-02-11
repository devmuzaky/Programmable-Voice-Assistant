import {Injectable} from '@angular/core';

import {ScriptData} from "../interfaces/script-data";

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
    picture: 'https://cdn-icons-png.flaticon.com/512/887/887997.png',
    description: 'Description 1',
    parameters: 'Parameters 1',
    status: 'Status 1'
  },
  {
    name: 'Script 2',
    command: 'Command 2',
    picture: 'https://cdn-icons-png.flaticon.com/512/3244/3244808.png',
    description: 'Description 2',
    parameters: 'Parameters 2',
    status: 'Status 2'
  },
  {
    name: 'Script 3',
    command: 'Command 3',
    picture: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
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
