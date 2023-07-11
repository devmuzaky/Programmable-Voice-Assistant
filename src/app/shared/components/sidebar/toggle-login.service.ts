import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToggleLoginService {

  toggleModal: boolean;
  private _toggleModal: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get toggleModal$() {
    return this._toggleModal.asObservable();
  }

  toggleLogin() {
    this.toggleModal = !this.toggleModal;
    this._toggleModal.next(this.toggleModal);
  }
}
