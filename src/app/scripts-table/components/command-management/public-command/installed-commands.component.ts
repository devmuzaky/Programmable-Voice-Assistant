import {Component, OnInit} from '@angular/core';
import {MarketPlaceCommandDTO} from "../../../interfaces/MarketPlaceCommandDTO";
import {Parameter} from "../../../interfaces/parameter";
import {Pattern} from "../../../interfaces/pattern";
import {InstalledCommandsService} from "./installed-commands-service/installed-commands.service";
import {Observable} from "rxjs";
import {CommandService} from "../../../services/command.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ElectronService} from "../../../../core/services";

@Component({
  selector: 'installed-commands',
  templateUrl: './installed-commands.component.html',
  styleUrls: ['./installed-commands.component.scss']
})
export class InstalledCommandsComponent implements OnInit {
  commands: Observable<MarketPlaceCommandDTO[]>;

  constructor(
    private installedCommandsService: InstalledCommandsService,
    private commandService: CommandService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private electronService: ElectronService
  ) {
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

  uninstallCommand(command: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to uninstall this command?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commandService.uninstallCommand(command.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Command uninstalled successfully!'
          });
          this.installedCommandsService.getInstalledCommands();
          this.electronService.ipcRenderer.send('delete-executable-file', command.id);
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Command could not be uninstalled!'
          });
        });
      }
    });
  }
}
