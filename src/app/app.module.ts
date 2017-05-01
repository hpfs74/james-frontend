import { ConfigInterface } from './config.interface';
import { ConfigService } from './config.service';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { requestOptionsProvider } from './services/default-request-opts.service';

import { AuthModule } from './auth.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { NicciService } from './services/nicci.service';


import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './pages/login/login-routing.module';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotPasswordRoutingModule } from './pages/forgot-password/forgot-password-routing.module';


//TODO: needed on login?
import { CookiesPageComponent } from './pages/cookies/cookies-page.component';

// Feature modules
import { SharedModule } from './shared.module';
import { HomeModule } from './pages/home/home.module';

// Styles 'barrel'
import '../styles/styles.scss';

// Needed because app initializer doesn't work with anonymous function
export function ConfigLoader(configService: ConfigService) {
  return () => configService.load('./config/api/config.json');
}

// !! Ensure AppRoutingModule is always imported last
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    HomeModule.forRoot(),
    LoginRoutingModule,
    ForgotPasswordRoutingModule,
    AuthModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
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
    requestOptionsProvider
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
