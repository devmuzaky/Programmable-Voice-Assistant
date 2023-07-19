import {Component, OnInit} from '@angular/core';
import {ElectronService} from './core/services';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ToggleLoginService} from "./shared/components/sidebar/toggle-login.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth = 0;
  toggleModal$: Observable<boolean>;
  hideMain: boolean;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
    private toggleLoginService: ToggleLoginService
  ) {
    this.translate.setDefaultLang('en');
    if (electronService.isElectron) {
      console.log('Run in electron');

    } else {
      console.log('Run in browser');
    }

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('/tray')) {
          this.hideMain = true;
        }
      }
    });}

  ngOnInit() {
    this.toggleModal$ = this.toggleLoginService.toggleModal$;
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }


  closeModal() {
    this.toggleLoginService.toggleLogin();
  }
}
