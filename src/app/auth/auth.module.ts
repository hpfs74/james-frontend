
import { NgModule, Injector, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Http, RequestOptions } from '@angular/http';

// import { SharedModule } from '../shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from './effects/auth.effects';
import { AuthService, AuthHttp, AuthGuard, LoginGuard } from './services';
import { LocalStorageService } from '../core/services';
import { LoaderService } from '../components/knx-app-loader/loader.service';
import { ContentConfig } from '../content.config';
import { RegistrationEffects } from './effects/registration.effects';

import { reducers } from './reducers';

export function authHttpServiceFactory(
  http: Http,
  authService: AuthService,
  options: RequestOptions,
  loaderService: LoaderService,
  localStorageService: LocalStorageService) {
    return new AuthHttp(http, authService, loaderService, localStorageService, options);
}

/* tslint:disable:no-use-before-declare */
@NgModule({
  imports: [CommonModule]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard,
        LoginGuard,
        LocalStorageService,
        LoaderService,
        ContentConfig,
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [Http, AuthService, RequestOptions, LoaderService, LocalStorageService]
        }
      ]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects, RegistrationEffects]),
  ],
})
export class RootAuthModule {}
/* tslint:enable */
