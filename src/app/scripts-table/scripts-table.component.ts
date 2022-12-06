import {Component, OnInit} from '@angular/core';
import { ScriptData } from "../core/interfaces/script-data";
import {ScriptsTableService} from "../core/services/scripts-table/scripts-table.service";
@Component({
  selector: 'app-scripts-table',
  templateUrl: './scripts-table.component.html',
  styleUrls: ['./scripts-table.component.scss']
})
export class ScriptsTableComponent implements OnInit {

  scripts: ScriptData[];

  constructor(private scriptsTableService: ScriptsTableService) {

  }

  ngOnInit(): void {
    this.scripts = this.scriptsTableService.getScripts();
  }

}
