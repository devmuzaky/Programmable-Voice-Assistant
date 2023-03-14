import {Component, Input, OnInit} from '@angular/core';
import {Command} from "../../interfaces/command.model";

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  @Input() command: Command;

  constructor() {
  }

  ngOnInit(): void {
  }


  installCommand(command: Command) {
    console.log('installCommand', command);
  }
}

