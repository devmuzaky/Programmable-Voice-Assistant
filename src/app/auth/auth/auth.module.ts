import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LogoutComponent} from '../logout/logout.component';
import {RegisterComponentComponent} from '../register-component/register-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {OnlyOneErrorPipe} from "../only-one-error.pipe";


@NgModule({
  declarations: [
    LogoutComponent,
    RegisterComponentComponent,
    OnlyOneErrorPipe
  ],
  exports: [
    RegisterComponentComponent,
    LogoutComponent,
    OnlyOneErrorPipe

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class AuthModule {
}
