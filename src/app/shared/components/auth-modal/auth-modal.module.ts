import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModalRoutingModule } from './auth-modal-routing.module';
import {AuthModalComponent} from "./modal-component/auth-modal.component";
import {SharedModule} from "../../shared.module";
import {AuthModule} from "../../../auth/auth/auth.module";


@NgModule({
  declarations: [
    AuthModalComponent
  ],
  exports: [
    AuthModalComponent
  ],
  imports: [
    CommonModule,
    AuthModalRoutingModule,
    SharedModule,
    AuthModule
  ]
})
export class AuthModalModule { }
