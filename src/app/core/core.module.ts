import { NgModule, ErrorHandler, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreRoutingModule } from './core.routing.module';

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
    StoreModule.forFeature('core', reducers),
    EffectsModule.forFeature([
      AssistantEffects,
      RouterEffects,
      ErrorEffects,
      AssistantEffects,
    ]),
    CoreRoutingModule.forRoot()
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [
    AuthRedirectModalComponent
  ]
})
export class CoreModule {
  // TODO: fix bug where CoreModule is lazy loaded, should be MainModule or something as root routing module
  // constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  //   if (parentModule) {
  //     throw new Error(
  //       'CoreModule is already loaded. Import it in the AppModule only');
  //   }
  // }

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
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
