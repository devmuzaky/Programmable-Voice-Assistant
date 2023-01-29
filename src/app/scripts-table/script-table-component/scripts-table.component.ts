import {Component, OnInit} from '@angular/core';
import { ScriptData } from "../interfaces/script-data";
import {ScriptsTableService} from "../services/scripts-table.service";
@Component({
  selector: 'app-services',
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
