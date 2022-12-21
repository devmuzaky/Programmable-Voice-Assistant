import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthModalComponent} from "./modal-component/auth-modal.component";

const routes: Routes = [
  {
    path:'modal',
    component: AuthModalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModalRoutingModule { }
