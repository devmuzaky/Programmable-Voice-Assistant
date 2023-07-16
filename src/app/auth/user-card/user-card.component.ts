import {StorageService} from "../services/storage.service";

import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../interface/user";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  userProfile: User;

  @Output('logout') logout: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private storageService: StorageService
  ) {
    this.userProfile = this.storageService.getUser();
  }

  onLogout() {
    this.logout.emit();
  }
}
