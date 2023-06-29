import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {debounceTime, distinctUntilChanged, fromEvent, map, switchMap} from "rxjs";
import {MarketPlaceCommandDTO} from "../../interfaces/MarketPlaceCommandDTO";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})

export class MarketplaceComponent implements AfterViewInit, OnInit {

  @ViewChild('input') input: ElementRef;

  @Input('marketplaceFlag') openMarketplace: boolean;

  @Output() closeMarketplaceEvent = new EventEmitter<void>();

  commandSelectedFlag = false;

  commandsList: MarketPlaceCommandDTO[] = [];
  commandSelected: MarketPlaceCommandDTO;
  showLoader: boolean = false;

  constructor(private commandService: CommandService) {

  }

  ngOnInit() {
    this.commandService.getMarketplaceCommands().subscribe(data => {
      this.commandsList = data;
      this.commandSelected = this.commandsList[0];
      this.commandSelectedFlag = true;
      console.log(this.commandsList)
    },
        error => console.error(error));

  }

  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(map((event: any) => {
        return event.target.value;
      }), debounceTime(1000), distinctUntilChanged(), switchMap(search => this.commandService.searchCommand(search)))
      .subscribe((results: any) => {
        this.commandsList = results;
      });


  }

  closeMarketplace() {
    console.log("closeMarketplace");
    this.closeMarketplaceEvent.emit();
  }
}
