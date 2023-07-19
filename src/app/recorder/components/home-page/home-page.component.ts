import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../../auth/services/auth-service/auth.service";
import {Observable} from "rxjs";
import {ToggleLoginService} from "../../../shared/components/sidebar/toggle-login.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  isLogin$: Observable<boolean>;

  @Output() onToggleModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private toggleLoginService: ToggleLoginService
  ) {
    this.isLogin$ = this.authService.isUserLoggedIn;
  }

  setToggleModal(e: MouseEvent) {
    e.preventDefault();
    this.toggleLoginService.toggleLogin();
  }

  getUsername() {
    return this.authService.getUsername();
  }

  openLinkInBrowser(link: string): void {
//ToDO: open link in browser
  }

}
