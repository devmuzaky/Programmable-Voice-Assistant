import {Component, NgZone} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-mic',
  templateUrl: './mic.component.html',
  styleUrls: ['./mic.component.scss']
})
export class MicComponent {

  isRecording = false;
  private record;
  private recording = false;
  url;
  private error;

  constructor(private domSanitizer: DomSanitizer, private ngZone: NgZone) {
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  initiateRecording() {
    this.recording = true;
    const mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };

    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.ngZone.run(() => {
      console.log('Outside Done!');
    });
  }

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.initiateRecording();
    }
    this.isRecording = !this.isRecording;
  }

  getRecordingState() {
    if (this.isRecording) return 'recording'
    else return '';
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

}
