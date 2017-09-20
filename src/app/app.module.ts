import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppShellModule } from '@angular/app-shell';
import { RouterModule, Router } from '@angular/router';
import { StoreModule, Action } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { routes } from './routes';
import { CustomRouterStateSerializer } from './utils/routersnapshot';
import { reducers, metaReducers } from './reducers';

import { RouterEffects } from './effects/router';

import { ContentService } from './content.service';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { requestOptionsProvider } from './services/default-request-opts.service';

import { AuthModule } from './auth/auth.module';

import { LocalStorageService } from './services/localstorage.service';

// Feature modules
import { SharedModule } from './shared.module';
import { HomeModule } from './pages/home/home.module';

export function ContentLoader(contentService: ContentService) {
  return () => contentService.loadFiles();
}

@NgModule({
  imports: [
    BrowserModule,

    BrowserAnimationsModule,

    FormsModule,

    HttpModule,

    RouterModule.forRoot(routes),

    SharedModule,

    HomeModule.forRoot(),

    StoreModule.forRoot(reducers, { metaReducers }),

    // !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 5 }) : [],

    StoreRouterConnectingModule,

    EffectsModule.forRoot([]),

    AuthModule.forRoot(),

    AppShellModule.runtime(),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    },
    ContentService,
    {
      provide: APP_INITIALIZER,
      useFactory: ContentLoader,
      deps: [ContentService],
      multi: true
    },
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    requestOptionsProvider,
    LocalStorageService,
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
