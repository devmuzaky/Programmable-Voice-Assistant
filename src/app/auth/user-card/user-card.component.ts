import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth-service/auth.service";
import {Router} from "@angular/router";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  user = {}

  @Output('logout') logout = new EventEmitter();

  constructor(private storageService: StorageService) {
    this.user = this.storageService.getUser();
  }

  onLogout() {
    this.logout.emit();
  }
}
