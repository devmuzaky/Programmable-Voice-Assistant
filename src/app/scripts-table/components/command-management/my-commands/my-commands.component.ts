import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Command} from "../../../interfaces/command.model";
import {CommandService} from "../../../services/command.service";
import {CommandEditInfoDTO} from "../../../interfaces/CommandEditInfoDTO";

@Component({
  selector: 'app-my-commands',
  templateUrl: './my-commands.component.html',
  styleUrls: ['./my-commands.component.scss']
})
export class MyCommandsComponent implements OnInit {

  @Input() selection: Command[];

  @Output() selectionChange = new EventEmitter<Command[]>();

  @Input() commands: Command[];

  @Input() deleteCommand: (command: Command) => void;

  showEditCommandForm: boolean;
  commandEditInfoDTO: CommandEditInfoDTO;

  constructor(private commandService: CommandService) {
  }

  ngOnInit(): void {
  }

  editCommand(id: number) {
    this.commandService.getCommandDetails(id).subscribe((commandEditInfoDTO: CommandEditInfoDTO) => {
        this.commandEditInfoDTO = commandEditInfoDTO;
        this.openEditCommandForm();
      }
    );
  }

  openEditCommandForm() {
    this.showEditCommandForm = true;
    setTimeout(() => {
      document.querySelectorAll<HTMLInputElement>('.disable-select-input-number .p-inputnumber-input').forEach(
        (element) => element.disabled = true)
    }, 200);
  }

  CloseEditCommandForm() {
    this.showEditCommandForm = false;
  }
}
