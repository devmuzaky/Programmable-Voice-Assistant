import {Injectable} from '@angular/core';
import {ElectronService} from "../../../core/services";


@Injectable({
  providedIn: 'root'
})
export class SttService {
  private wavPath: string = 'stt/temp/audio.wav';

  constructor(private electronService: ElectronService) {
  }

  // save the audio blob in a file and send it to the electron process to be converted to text
  async sendAudioBlob(audioBlob: Blob) {
    await this.storeAudioBlob(audioBlob, () => this.electronService.processAudio(this.wavPath));
  }

  // This function is used to store the audio blob in a file
  async storeAudioBlob(audioBlob: Blob, cb: Function) {
    const Blob = new Uint8Array(await audioBlob.arrayBuffer());

    this.electronService.saveFile(this.wavPath, Blob, (err) => {
      cb();
    });
  }
}
