import {Component, EventEmitter, Input, Output} from '@angular/core';
import {marketPlaceCommandDTO} from "../../../interfaces/MarketPlaceCommandDTO";
import {APP_CONFIG} from "../../../../../environments/environment";

@Component({
  selector: 'app-command-card',
  templateUrl: './command-card.component.html',
  styleUrls: ['./command-card.component.scss']
})
export class CommandCardComponent {

  apiBaseUrl = APP_CONFIG.apiBaseUrl;
  @Input() commandSelectedFlag: marketPlaceCommandDTO;
  @Input() command: marketPlaceCommandDTO;
  @Output() commandSelected = new EventEmitter<any>();
  @Output('commandSelectedFlag') selectedCommand = new EventEmitter<any>();

  onSelectCommand(command: marketPlaceCommandDTO) {
    this.commandSelected.emit(command);
    this.selectedCommand.emit(true);
  }
}
