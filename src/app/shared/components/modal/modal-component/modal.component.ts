import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter();

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    document.querySelector('#body').appendChild(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.element.nativeElement.remove();
  }

  closeModal() {
    this.close.emit();
  }
}
