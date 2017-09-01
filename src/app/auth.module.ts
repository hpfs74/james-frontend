
import { NgModule, Injector } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import * as fromRoot from './reducers/index';

import { AuthService, AuthHttp, LocalStorageService } from './services';
import { LoaderService } from './components/knx-app-loader/loader.service';

export function authHttpServiceFactory(
  http: Http,
  authService: AuthService,
  options: RequestOptions,
  loaderService: LoaderService,
  localStorageService: LocalStorageService) {
    return new AuthHttp(http, authService, loaderService, localStorageService, options);
}

@NgModule({
  providers: [
    LoaderService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, AuthService, RequestOptions, LoaderService, LocalStorageService]
    }
  ]
})
export class AuthModule {}
