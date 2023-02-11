import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LogoutComponent} from '../logout/logout.component';
import {RegisterComponentComponent} from '../register-component/register-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    LogoutComponent,
    RegisterComponentComponent
  ],
    exports: [
        RegisterComponentComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        MatInputModule
    ]
})
export class AuthModule { }
