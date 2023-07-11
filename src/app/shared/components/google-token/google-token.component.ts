import {Component} from '@angular/core';

@Component({
  selector: 'app-google-token',
  templateUrl: './google-token.component.html',
  styleUrls: ['./google-token.component.scss']
})
export class GoogleTokenComponent {

  token: string;

  constructor() {
  }

  addIcon() {
    window.open('https://developers.google.com/oauthplayground/', '_blank');

    this.getTokenFromGoogle();
  }

  private getTokenFromGoogle() {

  }

}
