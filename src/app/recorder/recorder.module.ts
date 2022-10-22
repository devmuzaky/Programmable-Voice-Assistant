import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecorderRoutingModule } from './recorder-routing.module';
import {RecorderComponent} from './components/recorder/recorder.component';
import {SharedModule} from '../shared/shared.module';
import { AudioVisualizerComponent } from './components/audio-visualizer/audio-visualizer.component';


@NgModule({
  declarations: [
    RecorderComponent,
    AudioVisualizerComponent
  ],
  exports: [
    AudioVisualizerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecorderRoutingModule
  ]
})
export class RecorderModule { }
