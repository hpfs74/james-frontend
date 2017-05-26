import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthService, AuthHttp } from './services';
import { LoaderService } from './components/knx-app-loader/loader.service';

export function authHttpServiceFactory(http: Http, authService: AuthService, options: RequestOptions, loaderService: LoaderService) {
  return new AuthHttp(http, authService, loaderService, options);
}

@NgModule({
  providers: [
    LoaderService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, AuthService, RequestOptions, LoaderService]
    }
  ]
})
export class AuthModule {}
