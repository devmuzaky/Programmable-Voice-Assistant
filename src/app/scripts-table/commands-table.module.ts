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
import { CommandCardComponent } from './components/marketplace-component/command-card/command-card.component';
import { CardPreviewComponent } from './components/marketplace-component/card-preview/card-preview.component';
import {CardModule} from "primeng/card";
import { InstalledCommandsComponent } from './components/command-management/installed-commands/installed-commands.component';
import { MyCommandsComponent } from './components/command-management/my-commands/my-commands.component';
import { CreateCommandFormComponent } from './components/command-management/create-command-form/create-command-form.component';
import { ParameterFieldComponent } from './components/command-management/create-command-form/parameter-field/parameter-field.component';
import { EditCommandFormComponent } from './components/command-management/edit-command-form/edit-command-form.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    MarketplaceComponent,
    CommandManagement,
    CommandCardComponent,
    CardPreviewComponent,
    InstalledCommandsComponent,
    MyCommandsComponent,
    CreateCommandFormComponent,
    ParameterFieldComponent,
    EditCommandFormComponent,
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
    TabViewModule,
    ProgressSpinnerModule
  ],
  exports: [
    MarketplaceComponent,
    CommandManagement
  ]
})
export class CommandsTableModule { }
