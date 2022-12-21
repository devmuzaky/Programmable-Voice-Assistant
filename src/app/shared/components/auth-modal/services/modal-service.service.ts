import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  isModalOpen = new EventEmitter();

  constructor() {
  }

  toggleModal() {
    this.isModalOpen.emit();
  }

}
