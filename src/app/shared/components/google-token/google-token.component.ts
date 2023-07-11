import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-google-token',
  templateUrl: './google-token.component.html',
  styleUrls: ['./google-token.component.scss']
})
export class GoogleTokenComponent {

  token: string;

  @Output() closeTokenModal: EventEmitter<void> = new EventEmitter();
  constructor() {
  }

  addIcon() {
    window.open('https://developers.google.com/oauthplayground/', '_blank');

    this.getTokenFromGoogle();
  }

  private getTokenFromGoogle() {

  }

  onSaveToken() {
    this.closeTokenModal.emit();
  }
}
