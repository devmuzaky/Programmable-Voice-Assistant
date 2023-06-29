import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MarketPlaceCommandDTO} from "../../../interfaces/MarketPlaceCommandDTO";
import {CommandService} from "../../../services/command.service";

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  @Input() command: MarketPlaceCommandDTO;
  @Output() showLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeMarketPlace: EventEmitter<void> = new EventEmitter<void>();
  constructor(private commandService: CommandService) {
  }

  ngOnInit(): void {
  }


  installCommand(id: number) {
    this.showLoader.emit(true);

    // do some work
    this.commandService.installCommand(id).subscribe((exe_link) => {
      // TODO: pass to electron to  download the exe save to the db

      // TODO: update the installed table

      // close the marketplace
      this.closeMarketPlace.emit()

      this.showLoader.emit(false);
    });

  }
}

