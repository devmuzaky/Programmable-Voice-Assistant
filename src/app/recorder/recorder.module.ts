import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecorderComponent } from './recorder/recorder.component';
import {SharedModule} from "../shared/shared.module";
import {RecorderRoutingModule} from "./recorder-routing.module";


@NgModule({
  declarations: [
    RecorderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecorderRoutingModule
  ]
})
export class RecorderModule { }
