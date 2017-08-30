
import { NgModule, Injector } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from './reducers/index';

import { AuthService, AuthHttp, LocalStorageService } from './services';
import { LoaderService } from './components/knx-app-loader/loader.service';

export function authHttpServiceFactory(
  http: Http,
  authService: AuthService,
  options: RequestOptions,
  loaderService: LoaderService,
  store: Store<any>,
  localStorageService: LocalStorageService) {
    return new AuthHttp(http, authService, loaderService, localStorageService, store, options);
}

@NgModule({
  providers: [
    LoaderService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, AuthService, RequestOptions, LoaderService, Store, LocalStorageService]
    }
  ]
})
export class AuthModule {}
