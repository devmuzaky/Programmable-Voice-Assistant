import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecorderRoutingModule } from './recorder-routing.module';
import {MicComponent} from './components/mic/mic.component';
import {SharedModule} from '../shared/shared.module';
import { AudioVisualizerComponent } from './components/audio-visualizer/audio-visualizer.component';
import { RecorderComponent } from './components/recorder/recorder.component';
import {ChatComponent} from "./components/chat/chat.component";


@NgModule({
  declarations: [
    MicComponent,
    AudioVisualizerComponent,
    RecorderComponent
  ],
  exports: [
    AudioVisualizerComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RecorderRoutingModule,
        ChatComponent
    ]
})
export class RecorderModule { }
