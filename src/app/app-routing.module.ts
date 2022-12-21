import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {DetailRoutingModule} from './detail/detail-routing.module';
import {RecorderRoutingModule} from "./recorder/recorder-routing.module";
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {ScriptsTableModule} from "./scripts-table/scripts-table.module";
import {AuthRoutingModule} from "./auth/auth/auth-routing.module";

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
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
    HomeRoutingModule,
    DetailRoutingModule,
    RecorderRoutingModule,
    ScriptsTableModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
