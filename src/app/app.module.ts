import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppShellModule } from '@angular/app-shell';
import { Router } from '@angular/router';
import { StoreModule, Action } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './reducers';
import { ProfileEffects } from './effects/profile';

import { CompareEffects } from './effects/compare';
import { CoverageEffects } from './effects/coverage';
import { SettingsEffects } from './effects/settings';

import { ContentService } from './content.service';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { requestOptionsProvider } from './services/default-request-opts.service';

import { AuthModule } from './auth.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './pages/login/login-routing.module';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { CookiesPageComponent } from './pages/cookies/cookies-page.component';

// Feature modules
import { SharedModule } from './shared.module';
import { HomeModule } from './pages/home/home.module';

export function ContentLoader(contentService: ContentService) {
  return () => contentService.loadFiles();
}

// !! Ensure AppRoutingModule is always imported last
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    HomeModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    LoginRoutingModule,
    AppRoutingModule,
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(
    [
      ProfileEffects,
      CompareEffects,
      CoverageEffects,
      SettingsEffects
    ]),
    AuthModule,
    AppShellModule.runtime(),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordResetComponent,
    CookiesPageComponent,
  ],
  providers: [
    ContentService,
    {
      provide: APP_INITIALIZER,
      useFactory: ContentLoader,
      deps: [ContentService],
      multi: true
    },
    requestOptionsProvider,
    CurrencyPipe
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
