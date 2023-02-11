import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  isUserLoggedIn = false;


  constructor() {
  }

  ngOnInit(): void {
  }


}
