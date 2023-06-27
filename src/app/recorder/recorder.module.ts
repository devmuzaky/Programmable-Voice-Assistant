import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecorderRoutingModule } from './recorder-routing.module';
import {MicComponent} from './components/mic/mic.component';
import {SharedModule} from '../shared/shared.module';
import { AudioVisualizerComponent } from './components/audio-visualizer/audio-visualizer.component';
import { RecorderComponent } from './components/recorder/recorder.component';
import {ChatComponent} from "./components/chat/chat.component";
import {ChipsModule} from "primeng/chips";
import {TrayModule} from "../tray/tray.module";


@NgModule({
  declarations: [
    MicComponent,
    AudioVisualizerComponent,
    RecorderComponent,
    ChatComponent
  ],
  exports: [
    AudioVisualizerComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RecorderRoutingModule,
    ChipsModule,

  ]
})
export class RecorderModule { }
