import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Command, CommandForTableDTO} from "../../../interfaces/command.model";
import {CommandService} from "../../../services/command.service";
import {CommandEditInfoDTO} from "../../../interfaces/CommandEditInfoDTO";
import {Parameter} from "../../../interfaces/parameter";
import {Pattern} from "../../../interfaces/pattern";

@Component({
  selector: 'app-my-commands',
  templateUrl: './my-commands.component.html',
  styleUrls: ['./my-commands.component.scss']
})
export class MyCommandsComponent implements OnInit {

  @Input() selection: CommandForTableDTO[];

  @Output() selectionChange = new EventEmitter<CommandForTableDTO[]>();

  @Input() commands: CommandForTableDTO[];

  @Input() deleteCommand: (command: CommandForTableDTO) => void;

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

  getParameterString(parameters: Parameter[]) {

    return parameters
      .sort(parameter => parameter.order)
      .map(parameter => `${parameter.name} (${parameter.type})`)
      .join(', ');
  }

  getPatternsString(patterns: Pattern[]) {
    return patterns.map(pattern => pattern.syntax).join('/ ');
  }

  downloadCommandFiles(command: CommandForTableDTO) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = command.script_link;
    link.download = `${command.name}_script.zip`;
    link.click();

    link.target = '_blank';
    link.href = command.requirements_link;
    link.download = `${command.name}_requirements.zip`;
    link.click();

    link.target = '_blank';
    link.href = command.icon_link;
    link.download = `${command.name}_icon.zip`;
    link.click();
  }
}
