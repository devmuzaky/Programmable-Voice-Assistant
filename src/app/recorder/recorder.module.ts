import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecorderRoutingModule} from './recorder-routing.module';
import {MicComponent} from './components/mic/mic.component';
import {AudioVisualizerComponent} from './components/audio-visualizer/audio-visualizer.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {ChatComponent} from "./components/chat/chat.component";
import {ChipsModule} from "primeng/chips";


@NgModule({
  declarations: [
    MicComponent,
    AudioVisualizerComponent,
    HomePageComponent,
    ChatComponent
  ],
    exports: [
        AudioVisualizerComponent,
        ChatComponent,
        MicComponent
    ],
  imports: [
    CommonModule,
    RecorderRoutingModule,
    ChipsModule,

  ]
})
export class RecorderModule {
}
