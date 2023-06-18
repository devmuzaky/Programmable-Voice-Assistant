import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {PageNotFoundComponent} from './components/';
import {WebviewDirective} from './directives/';
import {FormsModule} from '@angular/forms';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ModalComponent} from './components/modal/modal-component/modal.component';
import {HomeComponent} from './components/home/home.component';
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ListboxModule} from "primeng/listbox";
import {NotificationCardComponent} from './components/notifications/notification-card/notification-card.component';
import {NotificationListComponent} from './components/notifications/notification-list/notification-list.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, SidebarComponent, ModalComponent, HomeComponent, NotificationCardComponent, NotificationListComponent],
  imports: [CommonModule, TranslateModule, FormsModule, BrowserAnimationsModule, RouterModule, OverlayPanelModule, ListboxModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, SidebarComponent, ModalComponent]
})
export class SharedModule {
}
