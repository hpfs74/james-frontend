import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppShellModule } from '@angular/app-shell';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './reducers';
import { ProfileEffects } from './effects/profile';
import { CarEffects } from './effects/car';
import { CompareEffects } from './effects/compare';

import { ConfigInterface } from './config.interface';
import { ConfigService } from './config.service';
import { ContentService } from './content.service';

import { AppComponent } from './app.component';
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

// Styles 'barrel'
import '../styles/styles.scss';

// Needed because app initializer doesn't work with anonymous function
export function ConfigLoader(configService: ConfigService) {
  let configFile = './config/api/config.mock.json';

  if (process.env.ENV === 'test') {
    configFile = './config/api/config.json';
  } else if (process.env.ENV === 'production') {
    configFile = './config/api/config.prod.json';
  }

  return () => configService.load(configFile);
}

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
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     *
     * Use runAfterBootstrap because services require api endpoints from ConfigLoader
     */
    RouterStoreModule.connectRouter(),
    EffectsModule.runAfterBootstrap(ProfileEffects),
    EffectsModule.runAfterBootstrap(CarEffects),
    EffectsModule.runAfterBootstrap(CompareEffects),
    LoginRoutingModule,
    AuthModule,
    AppRoutingModule,
    AppShellModule.runtime(),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordResetComponent,
    CookiesPageComponent,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
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
