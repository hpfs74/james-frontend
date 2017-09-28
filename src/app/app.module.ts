import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
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
import { ContentService } from './content.service';

import { reducers, metaReducers } from './reducers';

import { AppComponent } from './core/containers/app.component';
import { environment } from '../environments/environment';

// Feature modules
import { SharedModule } from './shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { InsuranceModule } from './insurance/insurance.module';
import { AddressModule } from './address/address.module';

export function ContentLoader(contentService: ContentService) {
  return () => contentService.loadFiles();
}

@NgModule({
  imports: [
    BrowserModule,

    BrowserAnimationsModule,

    FormsModule,

    HttpModule,

    RouterModule.forRoot(routes, { useHash: true }),

    SharedModule,

    StoreModule.forRoot(reducers, { metaReducers }),

    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 5 }) : [],

    StoreRouterConnectingModule,

    EffectsModule.forRoot([]),

    AuthModule.forRoot(),

    CoreModule.forRoot(),

    InsuranceModule.forRoot(),

    AddressModule.forRoot(),

    AppShellModule.runtime(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    },
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    },
    ContentService,
    {
      provide: APP_INITIALIZER,
      useFactory: ContentLoader,
      deps: [ContentService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
