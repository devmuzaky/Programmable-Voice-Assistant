import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {navbarData} from './nav-data';
import {AuthService} from "../../../auth/services/auth-service/auth.service";
import {Observable} from "rxjs";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {


  @Output() onToggleModal: EventEmitter<boolean> = new EventEmitter();


  navData = navbarData;
  toggleModal: boolean;
  isLogin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLogin$ = this.authService.isUserLoggedIn;
  }

  ngOnInit(): void {
  }


  setToggleModal(e: MouseEvent) {
    e.preventDefault();
    this.toggleModal = !this.toggleModal;
    this.onToggleModal.emit(this.toggleModal);
  }
}
