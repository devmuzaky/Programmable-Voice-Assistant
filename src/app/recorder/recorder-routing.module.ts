import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MicComponent} from './components/mic/mic.component';
import {CommonModule} from '@angular/common';
import {AudioVisualizerComponent} from "./components/audio-visualizer/audio-visualizer.component";

const routes: Routes = [
  {
    path: 'mic',
    component: MicComponent
  },
  {
    path: 'audio-visualizer',
    component: AudioVisualizerComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecorderRoutingModule { }
