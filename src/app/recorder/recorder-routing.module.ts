import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {RecorderComponent } from './recorder/recorder.component';

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
export class RecorderRoutingModule {}
