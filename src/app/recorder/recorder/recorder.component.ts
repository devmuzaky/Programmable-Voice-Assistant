import {Component, NgZone, OnInit} from '@angular/core';

import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import {BehaviorSubject, Observable} from "rxjs";


@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {
  private showAudio: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showAudioObs: Observable<boolean> = this.showAudio.asObservable();

  title = 'micRecorder';
  record;
  recording = false;
  url;
  error;
  constructor(private domSanitizer: DomSanitizer, private _ngzone:NgZone) {}
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */
  initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 48000,
    };

    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.showAudio.next(true)
    console.log("blob", blob);
    console.log("url", this.url);
    this._ngzone.run(() => { console.log('Outside Done!'); });


  }

  errorCallback() {
    this.error = 'Can not play audio in your browser';
  }

  ngOnInit() {}
}
