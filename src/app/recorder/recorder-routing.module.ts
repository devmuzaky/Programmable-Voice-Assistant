import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from "./components/home-page/home-page.component";

const routes: Routes = [{path: 'home-page', component: HomePageComponent}];

@NgModule(
  {
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]

  }
)
export class RecorderRoutingModule {
}
