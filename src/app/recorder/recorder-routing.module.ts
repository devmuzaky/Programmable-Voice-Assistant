import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AudioVisualizerComponent} from "./components/audio-visualizer/audio-visualizer.component";
import {RecorderComponent} from "./components/recorder/recorder.component";

const routes: Routes = [
  {
    path: 'recorder',
    component: RecorderComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecorderRoutingModule {
}
