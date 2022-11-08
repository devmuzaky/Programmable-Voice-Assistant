import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {
  isRecording;

  constructor() {
  }

  ngOnInit(): void {
  }

  recordingState(isRecording: boolean) {
    this.isRecording = isRecording;
  }

}
