import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {debounceTime, distinctUntilChanged, fromEvent, map, switchMap} from "rxjs";
import {Command} from "../../interfaces/command.model";

@Component({
  selector: 'app-commands', templateUrl: './marketplace.component.html', styleUrls: ['./marketplace.component.scss']
})

export class MarketplaceComponent implements AfterViewInit, OnInit {

  @ViewChild('input', {static: true}) input: ElementRef;

  commandDialog: boolean;

  commandsList: Command[] = [];
  selectedCommand: any;

  constructor(private commandService: CommandService) {

  }

  openMarketplace() {
    this.commandDialog = true;
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

}
