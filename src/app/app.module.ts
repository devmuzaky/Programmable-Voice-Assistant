import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecorderModule} from './recorder/recorder.module';
import {ScriptsTableModule} from './scripts-table/scripts-table.module';
import {AuthModule} from './auth/auth/auth.module';
import {httpInterceptorProviders} from "./auth/_helper/http-request-interceptor.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";

import { AccordionModule } from 'primeng/accordion';

// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TrayModule} from "./tray/tray.module";
import {ConfirmationService, MessageService} from "primeng/api";


const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    RecorderModule,
    AppRoutingModule,
    ScriptsTableModule,
    AuthModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TrayModule,
    AccordionModule,


    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [httpInterceptorProviders, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
