import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ChatStreamModule } from './../../components/knx-chat-stream/chat-stream.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
<<<<<<< HEAD
import { DashboardDetailComponent } from './dashboard-detail.component';
=======
>>>>>>> f5c3acd... refactor(dashboard): add chat service in the dashboard


@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    DashboardRoutingModule
  ],
  declarations: [
<<<<<<< HEAD
    DashboardComponent,
    DashboardDetailComponent
=======
    DashboardComponent
>>>>>>> f5c3acd... refactor(dashboard): add chat service in the dashboard
  ]
})
export class DashboardModule {
}
