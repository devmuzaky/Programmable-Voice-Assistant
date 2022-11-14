import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {DetailRoutingModule} from './detail/detail-routing.module';
import {RecorderRoutingModule} from "./recorder/recorder-routing.module";
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';

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
    RecorderRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
