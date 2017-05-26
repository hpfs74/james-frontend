import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ChatStreamModule } from '../../components/knx-chat-stream/chat-stream.module';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/auth-guard.service';
import { AssistantService } from '../../services/assistant.service';
import { LoaderService } from '../../components/knx-app-loader/loader.service';

// Layout components
import { AppLoaderComponent } from '../../components/knx-app-loader/loader.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../../components/knx-navigation';
import { BreadCrumbComponent } from '../../components/knx-breadcrumb/breadcrumb.component';

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
    HomeRoutingModule.forRoot()
  ],
  declarations: [
    AppLoaderComponent,
    HomeComponent,
    BreadCrumbComponent,
    NavbarComponent,
    DashboardComponent,
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
        LoaderService
      ]
    };
  }
}
