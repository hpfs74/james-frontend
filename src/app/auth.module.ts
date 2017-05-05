import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthService, AuthHttp } from './services';

export function authHttpServiceFactory(http: Http, authService: AuthService, options: RequestOptions) {
  return new AuthHttp(http, authService, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, AuthService, RequestOptions]
    }
  ]
})
export class AuthModule {}
