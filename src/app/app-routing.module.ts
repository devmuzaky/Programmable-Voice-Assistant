import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {CommandsTableModule} from './scripts-table/commands-table.module';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {RecorderRoutingModule} from "./recorder/recorder-routing.module";
import {CommandManagement} from "./scripts-table/components/command-management/command-management.component";
import {MarketplaceComponent} from "./scripts-table/components/marketplace-component/marketplace.component";
import {RecorderComponent} from "./recorder/components/recorder/recorder.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recorder',
    pathMatch: 'full'
  },
  {
    path: 'recorder',
    component: RecorderComponent
  },
  {
    path: 'my-scripts',
    component: CommandManagement
  },
  {
    path: 'marketplace',
    component: MarketplaceComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommandsTableModule,
    AuthRoutingModule,
    RecorderRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
