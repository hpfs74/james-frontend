import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp } from './services/auth-http.service';
import { ConfigService } from './config.service';

export function authHttpServiceFactory(http: Http, configService: ConfigService, options: RequestOptions) {
  return new AuthHttp(http, configService, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, ConfigService, RequestOptions]
    }
  ]
})
export class AuthModule {}
