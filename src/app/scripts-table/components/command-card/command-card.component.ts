import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MarketPlaceCommandDTO} from "../../interfaces/MarketPlaceCommandDTO";

@Component({
  selector: 'app-command-card',
  templateUrl: './command-card.component.html',
  styleUrls: ['./command-card.component.scss']
})
export class CommandCardComponent {

  @Input() command: MarketPlaceCommandDTO;
  @Output() commandSelected = new EventEmitter<any>();

  @Output('commandSelectedFlag') selectedCommand = new EventEmitter<any>();


  onSelectCommand(command: MarketPlaceCommandDTO) {
    this.commandSelected.emit(command);
    this.selectedCommand.emit(true);

  }

}
