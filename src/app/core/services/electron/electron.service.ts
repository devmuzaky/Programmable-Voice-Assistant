import {Injectable} from '@angular/core';

// Electron Types
import {ipcRenderer} from 'electron';
import * as fs from 'fs';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  fs: typeof fs;

  private sttTextSubject: Subject<string> = new Subject<string>();
  private ttsAudioSubject: Subject<string | Uint8Array> = new Subject<string | Uint8Array>();

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.fs = window.require('fs');

      this.listenForSttReply();
      this.listenForTtsReply();
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  listenForSttReply() {
    this.ipcRenderer.on('stt-reply', (event, arg) => {
      this.sttReply(arg);
    });
  }

  listenForTtsReply() {
    this.ipcRenderer.on('tts-reply', (event, arg) => {
      this.ttsReply(arg);
    });
  }

  saveFile(fileName: string, data: any, callback: (err: any) => void) {
    this.fs.writeFile(fileName, data, callback);
  }

  processAudio(wavPath: string) {
    this.ipcRenderer.send('stt', wavPath);
  }

  sttReply(text: string) {
    this.sttTextSubject.next(text);
  }

  getSttTextObservable() {
    return this.sttTextSubject.asObservable();
  }

  ttsReply(audio: string | Uint8Array) {
    this.ttsAudioSubject.next(audio);
  }

  getTtsAudioObservable() {
    return this.ttsAudioSubject.asObservable();
  }
}
