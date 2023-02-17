import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {ScriptsTableModule} from './scripts-table/scripts-table.module';
import {AuthRoutingModule} from './auth/auth/auth-routing.module';
import {RecorderRoutingModule} from "./recorder/recorder-routing.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recorder',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ScriptsTableModule,
    AuthRoutingModule,
    RecorderRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
