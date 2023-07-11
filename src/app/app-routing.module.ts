import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {CommandsTableModule} from './scripts-table/commands-table.module';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {RecorderRoutingModule} from "./recorder/recorder-routing.module";
import {CommandManagement} from "./scripts-table/components/command-management/command-management.component";
import {MarketplaceComponent} from "./scripts-table/components/marketplace-component/marketplace.component";
import {HomePageComponent} from "./recorder/components/home-page/home-page.component";
import {GoogleTokenComponent} from "./shared/components/google-token/google-token.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full',

  },
  {
    path: 'home-page',
    component: HomePageComponent
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
    path: 'gToken',
    component: GoogleTokenComponent
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
