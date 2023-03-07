import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Command} from "../../interfaces/command.model";

@Component({
  selector: 'app-command-card',
  templateUrl: './command-card.component.html',
  styleUrls: ['./command-card.component.scss']
})
export class CommandCardComponent {

  @Input() command: Command;
  @Output() commandSelected = new EventEmitter<any>();

  @Output('commandSelectedFlag') selectedCommand = new EventEmitter<any>();


  onSelectCommand(command: Command) {
    this.commandSelected.emit(command);
    this.selectedCommand.emit(true);

  }

}
