import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AppShellModule } from '@angular/app-shell';
import { RouterModule, Router } from '@angular/router';
import { StoreModule, Action } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { routes } from './routes';
import { CustomRouterStateSerializer } from './utils/routersnapshot';
import { ContentConfig } from './content.config';

import { reducers, metaReducers } from './reducers';

import { AppComponent } from './core/containers/app.component';
import { environment } from '@env/environment';
import { ContentLoader } from './utils/contentloader';

// Feature modules
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { InsuranceModule } from './insurance/insurance.module';
import { AddressModule } from './address/address.module';
import { FeatureLoader } from '@app/utils/feature-loader';
import { FeatureConfigService } from '@app/utils/feature-config.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedService } from '@app/shared/services/shared.service';
import { LoadScriptsService } from '@app/core/services/load-scripts.service';
import { LoadScriptLoaderService } from '@app/core/services/load-scripts-loader.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.james.langEndpoint);
}

@NgModule({
  imports: [
    BrowserModule,

    BrowserAnimationsModule,

    FormsModule,

    HttpModule,

    HttpClientModule,

    RouterModule.forRoot(routes),

    StoreModule.forRoot(reducers, {metaReducers}),

    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25}) : [],

    StoreRouterConnectingModule,

    EffectsModule.forRoot([]),

    CoreModule.forRoot(),

    AuthModule.forRoot(),

    InsuranceModule.forRoot(),

    AddressModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

    // AppShellModule.runtime(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    },
    ContentConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: ContentLoader,
      deps: [ContentConfig],
      multi: true
    },
    FeatureConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: FeatureLoader,
      deps: [FeatureConfigService],
      multi: true
    },
    LoadScriptsService,
    {
      provide: APP_INITIALIZER,
      useFactory: LoadScriptLoaderService,
      deps: [LoadScriptsService],
      multi: true
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
    SharedService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
