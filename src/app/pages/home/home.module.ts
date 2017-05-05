import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/auth-guard.service';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';

// Layout components
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
    HomeRoutingModule.forRoot()
  ],
  declarations: [
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
        ChatStreamService
      ]
    };
  }
}
