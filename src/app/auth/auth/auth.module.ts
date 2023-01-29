import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LogoutComponent} from '../logout/logout.component';
import {LoginComponentComponent} from '../login-component/login-component.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LogoutComponent,
    LoginComponentComponent
  ],
    exports: [
        LoginComponentComponent,
        LogoutComponent
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
