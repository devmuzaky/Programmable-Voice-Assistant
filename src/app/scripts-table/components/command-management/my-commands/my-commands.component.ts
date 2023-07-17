import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommandForTableDTO} from "../../../interfaces/command.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {ElectronService} from "../../../../core/services";
import {MyCommandService} from "./my-command-service/my-command.service";
import {Observable} from "rxjs";
import {CommandService} from "../../../services/command.service";
import {CommandEditInfoDTO} from "../../../interfaces/CommandEditInfoDTO";
import {Parameter} from "../../../interfaces/parameter";
import {Pattern} from "../../../interfaces/pattern";
import {APP_CONFIG} from "../../../../../environments/environment";

@Component({
  selector: 'my-commands',
  templateUrl: './my-commands.component.html',
  styleUrls: ['./my-commands.component.scss']
})
export class MyCommandsComponent implements OnInit {
  @Input() selection: CommandForTableDTO[];
  @Output() selectionChange = new EventEmitter<CommandForTableDTO[]>();
  apiBaseUrl = APP_CONFIG.apiBaseUrl;
  showEditCommandForm: boolean;
  commandEditInfoDTO: CommandEditInfoDTO;
  showLoader: boolean = false;
  commands$: Observable<CommandForTableDTO[]>;

  constructor(
    private commandService: CommandService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private electronService: ElectronService,
    private myCommandService: MyCommandService
  ) {
  }

  ngOnInit(): void {
    this.commands$ = this.myCommandService.myCommands$;
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
      .map(parameter => `${parameter.name}`)
      .join(', ');
  }

  getPatternsString(patterns: Pattern[]) {
    return patterns.map(pattern => pattern.syntax).join(' \n\n');
  }

  downloadCommandFiles(command: CommandForTableDTO) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = command.script_link;
    link.download = `${command.name}_script.py`;
    link.click();

    link.target = '_blank';
    link.href = command.requirements_link;
    link.download = `${command.name}_requirements.txt`;
    link.click();

    link.target = '_blank';
    link.href = command.icon_link;
    link.download = `${command.name}_icon.png`;
    link.click();
  }

  deleteCommand(command: CommandForTableDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + command.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showLoader = true;
        this.commandService.deleteCommand(command.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Command deleted successfully!'
          });
          this.electronService.ipcRenderer.send('delete-executable-file', command.id);
          this.myCommandService.fetchMyCommands();
          this.showLoader = false;
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Command could not be deleted!'
          });
          this.showLoader = false;
        });
      }
    });
  }
}
