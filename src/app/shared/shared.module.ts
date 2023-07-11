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
import {TrayModule} from "../tray/tray.module";
import {AuthModule} from "../auth/auth.module";
import {ButtonModule} from "primeng/button";
import {RecorderModule} from "../recorder/recorder.module";
import { LoaderComponent } from './components/loader/loader.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { GoogleTokenComponent } from './components/google-token/google-token.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, SidebarComponent, ModalComponent, HomeComponent, NotificationCardComponent, NotificationListComponent, LoaderComponent, GoogleTokenComponent],
    imports: [CommonModule, TranslateModule, FormsModule, BrowserAnimationsModule, RouterModule, OverlayPanelModule, ListboxModule, TrayModule, AuthModule, ButtonModule, RecorderModule, ProgressSpinnerModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, SidebarComponent, ModalComponent, LoaderComponent]
})
export class SharedModule {
}
