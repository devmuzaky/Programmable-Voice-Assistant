import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MarketPlaceCommandDTO} from "../../../interfaces/MarketPlaceCommandDTO";
import {APP_CONFIG} from "../../../../../environments/environment";

@Component({
  selector: 'app-command-card',
  templateUrl: './command-card.component.html',
  styleUrls: ['./command-card.component.scss']
})
export class CommandCardComponent {

  @Input() command: MarketPlaceCommandDTO;
  @Input() commandSelectedFlag: MarketPlaceCommandDTO;
  @Output() commandSelected = new EventEmitter<any>();
  @Output('commandSelectedFlag') selectedCommand = new EventEmitter<any>();
  apiBaseUrl = APP_CONFIG.apiBaseUrl;

  onSelectCommand(command: MarketPlaceCommandDTO) {
    this.commandSelected.emit(command);
    this.selectedCommand.emit(true);

  }

}
