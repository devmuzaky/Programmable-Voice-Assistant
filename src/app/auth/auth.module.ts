import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {RegisterComponentComponent} from './register-component/register-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {OnlyOneErrorPipe} from "./pipes/only-one-error/only-one-error.pipe";
import {CheckboxModule} from "primeng/checkbox";
import {UserCardComponent} from "./user-card/user-card.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    RegisterComponentComponent,
    OnlyOneErrorPipe,
    UserCardComponent
  ],
  exports: [
    RegisterComponentComponent,
    OnlyOneErrorPipe,
    UserCardComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    CheckboxModule,
    ProgressSpinnerModule
  ]
})
export class AuthModule {
}
