import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScriptsTableComponent} from "./script-table-component/scripts-table.component";

const routes: Routes = [
  {
    path: 'my-scripts',
    component: ScriptsTableComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScriptsTableRoutingModule { }
