import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {FileUpload} from "primeng/fileupload";
import {Command} from "../../interfaces/command.model";
import {CommandCreateRequest} from "../../interfaces/commandCreateRequest.model";
import {CommandService} from "../../services/command.service";

@Component({
  selector: 'app-my-commands',
  templateUrl: './my-commands.component.html',
  styleUrls: ['./my-commands.component.scss']
})
export class MyCommandsComponent implements OnInit {



  commandDialog: boolean;

  commands: Command[];

  command: Command;

  selectedCommands: Command[];


  constructor(
    private commandService: CommandService, private messageService: MessageService, private confirmationService: ConfirmationService,) {
  }

  ngOnInit() {
    this.commandService.getUserCommands().subscribe(data => {
      this.commands = data;
    }, error => console.error(error));
  }



}
