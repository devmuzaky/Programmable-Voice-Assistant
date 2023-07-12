import {Component, OnInit} from '@angular/core';
import {MarketPlaceCommandDTO} from "../../../interfaces/MarketPlaceCommandDTO";
import {Parameter} from "../../../interfaces/parameter";
import {Pattern} from "../../../interfaces/pattern";
import {InstalledCommandsService} from "./installed-commands-service/installed-commands.service";
import {Observable} from "rxjs";
import {CommandService} from "../../../services/command.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ElectronService} from "../../../../core/services";
import {MyCommandService} from "../my-commands/my-command-service/my-command.service";
import {APP_CONFIG} from "../../../../../environments/environment";

@Component({
  selector: 'installed-commands',
  templateUrl: './installed-commands.component.html',
  styleUrls: ['./installed-commands.component.scss']
})
export class InstalledCommandsComponent implements OnInit {
  commands: Observable<MarketPlaceCommandDTO[]>;
  apiBaseUrl = APP_CONFIG.apiBaseUrl;
  loading: boolean = false;

  constructor(
    private installedCommandsService: InstalledCommandsService,
    private commandService: CommandService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private electronService: ElectronService,
    private myCommandService: MyCommandService
  ) {
  }

  ngOnInit() {
    this.commands = this.installedCommandsService.installedCommands$;
  }

  getParameterString(parameters: Parameter[]) {

    return parameters
      .sort(parameter => parameter.order)
      .map(parameter => `${parameter.name}`)
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
        this.loading = true;
        console.log("show loading");
        this.commandService.uninstallCommand(command.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Command uninstalled successfully!'
          });
          this.installedCommandsService.getInstalledCommands();
          this.electronService.ipcRenderer.send('delete-executable-file', command.id);
          this.loading = false;
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Command could not be uninstalled!'
          });
          this.loading = false;
        });
      }
    });
  }


  forkCommand(command: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to fork this command?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.commandService.forkCommand(command.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Command forked successfully!'
          });
          this.myCommandService.getMyCommands();
          this.loading = false;
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Command could not be forked!'
          });
          this.loading = false;
        });
      }
    });
  }
}
