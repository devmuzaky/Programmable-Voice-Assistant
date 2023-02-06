import {Component, NgZone, Output, EventEmitter} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-mic', templateUrl: './mic.component.html', styleUrls: ['./mic.component.scss']
})
export class MicComponent {

  isRecording = false;
  url;
  @Output() recordingState = new EventEmitter<boolean>();
  @Output() recorderOutput: EventEmitter<Blob> = new EventEmitter<Blob>();
  private record;
  private recording = false;
  private error;

  constructor(private domSanitizer: DomSanitizer, private ngZone: NgZone) {
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  initiateRecording() {
    this.recording = true;
    this.url = '';
    const mediaConstraints = {
      video: false, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1,
      desiredSampRate: 16000,
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
    this.recorderOutput.emit(blob);
    this.url = URL.createObjectURL(blob);

    // rerender angular manually (needed in the electron app)
    this.ngZone.run(() => {
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
    return this.isRecording ? 'recording' : '';
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }


  handleRecordingClick() {
    this.toggleRecording();
    this.recordingState.emit(this.isRecording);
  }

}
