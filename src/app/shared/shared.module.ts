import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, SidebarComponent],
  imports: [CommonModule, TranslateModule, FormsModule, BrowserAnimationsModule, RouterModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, SidebarComponent]
})
export class SharedModule {}
