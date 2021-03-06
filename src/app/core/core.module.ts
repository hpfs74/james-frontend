import { NgModule, ErrorHandler, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KNXLocale } from '@knx/locale';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { ChatStreamModule } from '../components/knx-chat-stream/chat-stream.module';
import { UserDialogModule } from '../components/knx-modal/user-dialog.module';
import { ProfileModule } from '../profile/profile.module';

// Effects
import { AssistantEffects } from './effects/assistant';
import { RouterEffects } from './effects/router';
import { ErrorEffects } from './effects/error';
import { WizardEffects } from './effects/wizard';

// Layout components
import { AppComponent } from './containers/app.component';
import { PageNotFoundComponent } from './containers/pagenotfound.component';
import { AppLoaderComponent } from '../components/knx-app-loader/loader.component';
import { NavbarComponent } from '../components/knx-navbar';

// import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthRedirectModalComponent } from './components/auth-redirect-modal.component';

// Services
import { LoaderService } from '../components/knx-app-loader/loader.service';
import { requestOptionsProvider } from './services/default-request-opts.service';
import { TagsLoader } from '../utils/tagsloader';
import {
  AssistantService,
  CanActivateCarFlowGuard,
  CanActivateHouseHoldFlowGuard,
  CookieService,
  GeolocationService,
  LocalStorageService,
  LoggingService,
  NavigationService,
  TagsService
} from './services';
import { GlobalErrorHandler } from './services/error-handler';

// Feature module reducer
import { reducers } from './reducers';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { ProfileModalComponent } from '@app/profile/components/profile-modal/profile-modal.component';
import { LayoutEffects } from '@app/core/effects/layout';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { KNXEndOfLineComponent } from '@app/house/components/knx-end-of-line/knx-end-of-line.component';
import { KnxOverlayModalComponent } from '@app/components/knx-overlay-modal/overlay-modal.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.james.langEndpoint);
}

export const COMPONENTS = [
  AppComponent,
  PageNotFoundComponent,
  NavbarComponent,
  AppLoaderComponent,
  AuthRedirectModalComponent,
  ProfileModalComponent,
  KNXEndOfLineComponent,
  KnxOverlayModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ChatStreamModule,
    UserDialogModule,
    ProfileModule,
    StoreModule.forFeature('app', reducers),
    EffectsModule.forFeature([
      AssistantEffects,
      RouterEffects,
      ErrorEffects,
      AssistantEffects,
      WizardEffects,
      LayoutEffects
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [
    AuthRedirectModalComponent,
    ProfileModalComponent,
    KNXEndOfLineComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      const error = 'CoreModule is already loaded. Import it in the AppModule only';
      console.warn(error);
      throw new Error(error);
    }
  }

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        KNXLocale,
        AssistantService,
        CanActivateCarFlowGuard,
        CanActivateHouseHoldFlowGuard,
        CookieService,
        GeolocationService,
        LocalStorageService,
        NavigationService,
        LoggingService,
        TagsService,
        requestOptionsProvider,
        CurrencyPipe,
        DatePipe,
        KNXWizardRxService,
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler
        },
        {
          provide: APP_INITIALIZER,
          useFactory: TagsLoader,
          deps: [TagsService],
          multi: true
        }
      ],
    };
  }
}
