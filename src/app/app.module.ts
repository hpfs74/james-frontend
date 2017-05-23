import { ConfigInterface } from './config.interface';
import { ConfigService } from './config.service';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppShellModule } from '@angular/app-shell';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { requestOptionsProvider } from './services/default-request-opts.service';

import { AuthModule } from './auth.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';


import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './pages/login/login-routing.module';

import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

//TODO: needed on login?
import { CookiesPageComponent } from './pages/cookies/cookies-page.component';

// Feature modules
import { SharedModule } from './shared.module';
import { HomeModule } from './pages/home/home.module';

// Styles 'barrel'
import '../styles/styles.scss';

// Needed because app initializer doesn't work with anonymous function
export function ConfigLoader(configService: ConfigService) {
<<<<<<< HEAD
  let configFile = './config/api/config.mock.json';

  if (process.env.ENV === 'test') {
    configFile = './config/api/config.json';
  } else if (process.env.ENV === 'production') {
    configFile = './config/api/config.prod.json';
  }

  return () => configService.load(configFile);
=======
  return () => configService.load('./config/api/config.mock.json');
>>>>>>> 69976fd... chore(config): use mock api by default
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
