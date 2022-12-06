import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScriptsTableRoutingModule } from './scripts-table-routing.module';
import {ScriptsTableComponent} from "./scripts-table.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ScriptsTableComponent
  ],
  imports: [
    CommonModule,
    ScriptsTableRoutingModule,
    SharedModule
  ]
})
export class ScriptsTableModule { }
