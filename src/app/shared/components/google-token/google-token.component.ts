import {Component, EventEmitter, Output} from '@angular/core';
import {ElectronService} from "../../../core/services";

@Component({
  selector: 'app-google-token',
  templateUrl: './google-token.component.html',
  styleUrls: ['./google-token.component.scss']
})
export class GoogleTokenComponent {

  token: string;

  @Output() closeTokenModal: EventEmitter<void> = new EventEmitter();
  constructor(private electronService: ElectronService) {
    this.token = localStorage.getItem('google-token') || '';
  }

  addIcon() {
    window.open('https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=412397975040-34od6dhsn56ktgkmb4tljiql397k89as.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob', '_blank');

    this.getTokenFromGoogle();
  }

  private getTokenFromGoogle() {

  }

  onSaveToken() {
    localStorage.setItem('google-token', this.token);
    this.electronService.ipcRenderer.send('add-google-token', this.token);

    this.closeTokenModal.emit();
  }
}
