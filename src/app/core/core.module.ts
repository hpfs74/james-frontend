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
  CanActivateBuyFlowGuard,
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
import { KNXWizardRxService } from '../components/knx-wizard-rx/knx-wizard-rx.service';

export const COMPONENTS = [
  AppComponent,
  PageNotFoundComponent,
  NavbarComponent,
  AppLoaderComponent,
  AuthRedirectModalComponent,
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
    ])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [
    AuthRedirectModalComponent
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
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
        CanActivateBuyFlowGuard,
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
