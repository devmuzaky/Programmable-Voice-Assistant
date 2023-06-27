import {Component, OnInit} from '@angular/core';
import {SttService} from "../../services/stt/stt.service";

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {
  isRecording;

  constructor(private sttService: SttService) {
  }

  ngOnInit(): void {
  }

}
