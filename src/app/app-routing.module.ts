import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {CommandsTableModule} from './scripts-table/commands-table.module';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {RecorderRoutingModule} from "./recorder/recorder-routing.module";
import {CommandsTableComponent} from "./scripts-table/components/commands-table-component/commands-table-component";
import {MarketplaceComponent} from "./scripts-table/components/marketplace-component/marketplace.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recorder',
    
  },
  {
    path: 'my-scripts',
    component: CommandsTableComponent
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
