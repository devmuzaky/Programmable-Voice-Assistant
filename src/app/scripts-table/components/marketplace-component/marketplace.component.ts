import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {debounceTime, distinctUntilChanged, fromEvent, map, switchMap} from "rxjs";
import {Command} from "../../interfaces/command.model";

@Component({
  selector: 'app-marketplace', templateUrl: './marketplace.component.html', styleUrls: ['./marketplace.component.scss']
})

export class MarketplaceComponent implements AfterViewInit, OnInit {

  @ViewChild('input') input: ElementRef;

  @Input('marketplaceFlag') openMarketplace: boolean;

  @Output() closeMarketplaceEvent = new EventEmitter<void>();

  commandSelectedFlag = false;

  commandsList: Command[] = [];
  commandSelected: Command;

  constructor(private commandService: CommandService) {

  }

  ngOnInit() {
    this.commandService.getCommands().subscribe(data => {
      this.commandsList = data;
      console.log("Commands: ", this.commandsList)
    }, error => console.error(error));

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
