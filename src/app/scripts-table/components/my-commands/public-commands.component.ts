import {Component, OnInit} from '@angular/core';
import {Command} from "../../interfaces/command.model";
import {CommandService} from "../../services/command.service";

@Component({
  selector: 'public-commands',
  templateUrl: './public-commands.component.html',
  styleUrls: ['./public-commands.component.scss']
})
export class PublicCommandsComponent implements OnInit {
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
