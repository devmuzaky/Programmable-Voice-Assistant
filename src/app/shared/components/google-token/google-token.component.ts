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

    this.electronService.ipcRenderer.on('get-token-url-replay', (event, authUrl) => {
      window.open(authUrl, '_blank');
    });
  }

  addIcon() {
    this.electronService.ipcRenderer.send('get-token-url');
  }

  onSaveToken() {
    localStorage.setItem('google-token', this.token);
    this.electronService.ipcRenderer.send('add-google-token', this.token);
    this.closeTokenModal.emit();
  }

}
