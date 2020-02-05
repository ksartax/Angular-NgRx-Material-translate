import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpBackend
} from '@angular/common/http';

import {
  AuthenticationGuard,
  AuthenticationService
} from '@appAuthentication/index';

import {
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  HttpService
} from '@appHttp/index';

import { LocalStorageService } from '@appServices/base/local-storage.service';
import { UtilService } from '@appServices/base/util.service';
import { ErrorMessageService } from '@appServices/base/error-message.service';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from '@appContainers/dashboard/dashboard.component';

import * as fromStore from '@appStore/index';
import { CustomRouterStateSerializer } from '@appStore/router';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThemeService } from '@appServices/theme/ThemeService';

// TRANSLATE HTTP CLIENT //
@Injectable({providedIn: 'root'})
export class HttpClientTrans extends HttpClient {
  constructor(handler: HttpBackend) {
    super(handler);
  }
}
// ===================== //

@NgModule({
  imports: [
    AppMaterialModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClientTrans) => new TranslateHttpLoader(http),
        deps: [HttpClientTrans]
      }
    }),
    HttpClientModule,
    StoreModule.forRoot(fromStore.reducers),
    EffectsModule.forRoot(fromStore.effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],

    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  providers: [
    LocalStorageService,
    AuthenticationService,
    UtilService,
    ThemeService,
    ErrorMessageService,
    AuthenticationGuard,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }