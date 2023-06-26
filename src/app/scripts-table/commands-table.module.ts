import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";
import {TabViewModule} from "primeng/tabview";

import {MarketplaceComponent} from "./components/marketplace-component/marketplace.component";
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
import {ReactiveFormsModule} from "@angular/forms";
import { CommandManagement } from './components/command-management/command-management.component';
import {CheckboxModule} from "primeng/checkbox";
import {StepsModule} from "primeng/steps";
import { CommandCardComponent } from './components/command-card/command-card.component';
import { CardPreviewComponent } from './components/card-preview/card-preview.component';
import {CardModule} from "primeng/card";
import { InstalledCommandsComponent } from './components/command-management/public-command/installed-commands.component';
import { MyCommandsComponent } from './components/command-management/my-commands/my-commands.component';
import { CreateCommandFormComponent } from './components/command-management/create-command-form/create-command-form.component';



@NgModule({
  declarations: [
    MarketplaceComponent,
    CommandManagement,
    CommandCardComponent,
    CardPreviewComponent,
    InstalledCommandsComponent,
    MyCommandsComponent,
    CreateCommandFormComponent,
  ],
  imports: [
    CommonModule,
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
    MatInputModule,
    ReactiveFormsModule,
    CheckboxModule,
    StepsModule,
    CardModule,
    MatTabsModule,
    TabViewModule
  ],
  exports: [
    MarketplaceComponent,
    CommandManagement
  ]
})
export class CommandsTableModule { }
