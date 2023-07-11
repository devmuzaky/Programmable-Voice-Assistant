import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrayComponent} from "./tray.component";
import {RecorderModule} from "../recorder/recorder.module";


@NgModule({
  declarations: [TrayComponent,],
  imports: [CommonModule, RecorderModule],
  exports: [TrayComponent]
})
export class TrayModule {
}
