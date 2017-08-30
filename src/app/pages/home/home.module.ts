import { NgModule, ModuleWithProviders } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared.module';
import { ChatStreamModule } from '../../components/knx-chat-stream/chat-stream.module';

import { HomeRoutingModule } from './home.routing.module';
import { CanActivateBuyFlowGuard } from '../../services/buy-guard.service';
import { HomeComponent } from './home.component';
import { FaqComponent } from '../faq/faq.component';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/auth-guard.service';
import { AssistantService } from '../../services/assistant.service';
import { LoaderService } from '../../components/knx-app-loader/loader.service';
import { ProfileService } from '../../services/profile.service';
import { CarService } from '../car/car.service';

// Effects
import { AssistantEffects } from '../../effects/assistant';
import { ProfileEffects } from '../../effects/profile';
import { CompareEffects } from '../../effects/compare';
import { CoverageEffects } from '../../effects/coverage';
import { SettingsEffects } from '../../effects/settings';

// Layout components
import { AppLoaderComponent } from '../../components/knx-app-loader/loader.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../../components/knx-navigation';

/**
 * Home is the container module for all feature modules that are available after logging in
 *
 * @export
 * @class HomeModule
 */
@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    EffectsModule.forFeature([
      AssistantEffects,
      ProfileEffects,
      CompareEffects,
      CoverageEffects,
      SettingsEffects
    ]),
    HomeRoutingModule.forRoot()
  ],
  declarations: [
    AppLoaderComponent,
    HomeComponent,
    NavbarComponent,
    FaqComponent
  ]
})
export class HomeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HomeModule,
      providers: [
        AuthService,
        AuthGuard,
        AssistantService,
        LoaderService,
        ProfileService,
        CarService,
        CanActivateBuyFlowGuard
      ]
    };
  }
}
