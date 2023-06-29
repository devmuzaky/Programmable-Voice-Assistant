import {Component, OnInit} from '@angular/core';
import {MarketPlaceCommandDTO} from "../../../interfaces/MarketPlaceCommandDTO";
import {Parameter} from "../../../interfaces/parameter";
import {Pattern} from "../../../interfaces/pattern";
import {InstalledCommandsService} from "./installed-commands-service/installed-commands.service";
import {Observable} from "rxjs";

@Component({
  selector: 'installed-commands',
  templateUrl: './installed-commands.component.html',
  styleUrls: ['./installed-commands.component.scss']
})
export class InstalledCommandsComponent implements OnInit {
  commands: Observable<MarketPlaceCommandDTO[]>;

  constructor(
    private installedCommandsService: InstalledCommandsService) {
  }

  ngOnInit() {
    this.commands = this.installedCommandsService.installedCommands$;
  }

  getParameterString(parameters: Parameter[]) {

    return parameters
      .sort(parameter => parameter.order)
      .map(parameter => `${parameter.name} (${parameter.type})`)
      .join(', ');
  }

  getPatternsString(patterns: Pattern[]) {
    return patterns.map(pattern => pattern.syntax).join('/ ');
  }
}
