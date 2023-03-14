import {Injectable} from '@angular/core';

// Electron Types
import {ipcRenderer} from 'electron';
import * as fs from 'fs';
import {Subject} from "rxjs";
import * as child_process from "child_process";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  fs: typeof fs;
  childProcess: typeof child_process;

  private sttTextSubject: Subject<string> = new Subject<string>();
  private ttsAudioSubject: Subject<string | Uint8Array> = new Subject<string | Uint8Array>();
  private ScriptResponseSubject: Subject<string> = new Subject<string>();

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.fs = window.require('fs');

      this.childProcess = window.require('child_process');

      this.listenForSttReply();
      this.listenForTtsReply();
      this.listenForScriptRunReplay();
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

  runScript(scriptName: string, args: string[] = []) {
    console.log("running script: ", scriptName);
    this.ipcRenderer.send('run-script', scriptName, args);
  }

  listenForScriptRunReplay() {
    this.ipcRenderer.on('run-script-reply', (event, response) => {
      this.ScriptResponseSubject.next(response);
    });
  }

  getScriptResponseObservable() {
    return this.ScriptResponseSubject.asObservable();
  }
}
