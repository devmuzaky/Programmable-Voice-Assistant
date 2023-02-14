import {Injectable} from '@angular/core';
import {ElectronService} from "../../../core/services";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  audio$: Observable<string | Uint8Array>;

  constructor(private electronService: ElectronService) {
    this.audio$ = this.electronService.getTtsAudioObservable();
  }

  tts(text: string) {
    this.electronService.ipcRenderer.send('tts', text);
  }

  getAudioObservable() {
    return this.audio$;
  }

}
