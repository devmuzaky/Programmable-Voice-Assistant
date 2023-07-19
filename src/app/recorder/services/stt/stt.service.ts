import {Injectable} from '@angular/core';
import {ElectronService} from "../../../core/services";


@Injectable({
  providedIn: 'root'
})
export class SttService {
  private wavPath: string = 'stt/temp/audio.wav';

  constructor(private electronService: ElectronService) {
  }

  async sendAudioBlob(audioBlob: Blob) {
    await this.storeAudioBlob(audioBlob, () => this.electronService.processAudio(this.wavPath));
  }

  async storeAudioBlob(audioBlob: Blob, cb: Function) {
    const Blob = new Uint8Array(await audioBlob.arrayBuffer());

    this.electronService.saveFile(this.wavPath, Blob, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      cb();
    });
  }

  getTranscriptObservable() {
    return this.electronService.getSttTextObservable();
  }
}
