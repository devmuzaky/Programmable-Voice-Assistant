import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {debounceTime, distinctUntilChanged, fromEvent, map, Subject, switchMap, takeUntil} from "rxjs";
import {marketPlaceCommandDTO} from "../../interfaces/MarketPlaceCommandDTO";

@Component({
  selector: 'app-marketplace', templateUrl: './marketplace.component.html', styleUrls: ['./marketplace.component.scss']
})

export class MarketplaceComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('input') input: ElementRef;

  @Input('marketplaceFlag') openMarketplace: boolean;

  @Output() closeMarketplaceEvent = new EventEmitter<void>();

  showLoader: boolean = false;
  commandSelectedFlag = false;
  commandsList: marketPlaceCommandDTO[] = [];
  commandSelected: marketPlaceCommandDTO;

  private destroy$ = new Subject<void>();


  constructor(private commandService: CommandService) {
  }

  ngOnInit() {
    this.commandService.getMarketplaceCommands()
      .subscribe(data => {
          this.commandsList = data;
          if (this.commandsList.length > 0) this.commandSelected = this.commandsList[0];
          else {
            this.commandSelected = null;
            this.commandSelectedFlag = false;
          }
          if (this.commandsList.length > 0) this.commandSelectedFlag = true;
        },
        error => console.error(error));
  }

  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(search => this.commandService.searchCommand(search)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (results: marketPlaceCommandDTO[]) => {
          this.commandsList = results;
          if (this.commandsList.length > 0) {
            this.commandSelected = this.commandsList[0];
          } else {
            this.commandSelected = null;
            this.commandSelectedFlag = false;
          }
          if (this.commandsList.length > 0) this.commandSelectedFlag = true;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  closeMarketplace() {
    console.log("closeMarketplace");
    this.closeMarketplaceEvent.emit();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
