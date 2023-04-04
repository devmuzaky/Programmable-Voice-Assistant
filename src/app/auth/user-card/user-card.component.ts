import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  user = {
    name: 'John Doe',
    email: 'moe_zaki'
  }

  @Output('logout') logout = new EventEmitter();

  constructor() {
  }

  onLogout() {
    this.logout.emit();
  }
}
