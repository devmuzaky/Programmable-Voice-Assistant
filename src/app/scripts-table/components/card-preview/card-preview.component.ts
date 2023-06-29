import {Component, Input, OnInit} from '@angular/core';
import {MarketPlaceCommandDTO} from "../../interfaces/MarketPlaceCommandDTO";

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  @Input() command: MarketPlaceCommandDTO;

  constructor() {
  }

  ngOnInit(): void {
  }


  installCommand(command: MarketPlaceCommandDTO) {
    console.log('installCommand', command);
  }
}

