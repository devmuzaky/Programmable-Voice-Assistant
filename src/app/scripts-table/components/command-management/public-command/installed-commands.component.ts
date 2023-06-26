import {Component, OnInit} from '@angular/core';
import {Command} from "../../../interfaces/command.model";
import {CommandService} from "../../../services/command.service";

@Component({
  selector: 'installed-commands',
  templateUrl: './installed-commands.component.html',
  styleUrls: ['./installed-commands.component.scss']
})
export class InstalledCommandsComponent implements OnInit {
  commands: Command[];

  constructor(
    private commandService: CommandService) {
  }

  ngOnInit() {
    this.commandService.getCommands().subscribe(data => {
      this.commands = data;
    }, error => console.error(error));
  }

}
