import {Component, EventEmitter, Input, Output} from "@angular/core";
import {marketPlaceCommandDTO} from "../../../interfaces/MarketPlaceCommandDTO";
import {CommandService} from "../../../services/command.service";
import {ElectronService} from "../../../../core/services";
import {
  InstalledCommandsService
} from "../../command-management/installed-commands/installed-commands-service/installed-commands.service";

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent {
  @Input() command: marketPlaceCommandDTO;
  @Output() showLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeMarketPlace: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private commandService: CommandService,
    private electronService: ElectronService,
    private installedCommandsService: InstalledCommandsService
  ) {
  }
  installCommand(id: number) {
    this.showLoader.emit(true);

    this.commandService.installCommand(id).subscribe((command) => {
      this.electronService.ipcRenderer.send('save_executable', command.id, command.name, command.executable_url);

      this.installedCommandsService.getInstalledCommands();

      this.showLoader.emit(false);
      this.closeMarketPlace.emit()
    });

  }
}
