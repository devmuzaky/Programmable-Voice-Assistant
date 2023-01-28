import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ModalComponent} from './components/modal/modal-component/modal.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, SidebarComponent, ModalComponent],
  imports: [CommonModule, TranslateModule, FormsModule, BrowserAnimationsModule, RouterModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, SidebarComponent, ModalComponent]
})
export class SharedModule {}
