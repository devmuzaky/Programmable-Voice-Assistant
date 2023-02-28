import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScriptsTableRoutingModule } from './scripts-table-routing.module';
import {ScriptsTableComponent} from "./script-table-component/scripts-table.component";
import {SharedModule} from "../shared/shared.module";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {RatingModule} from "primeng/rating";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    ScriptsTableComponent
  ],
  imports: [
    CommonModule,
    ScriptsTableRoutingModule,
    SharedModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    RippleModule,
    TableModule,
    InputTextModule,
    RatingModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    MatInputModule
  ]
})
export class ScriptsTableModule { }
