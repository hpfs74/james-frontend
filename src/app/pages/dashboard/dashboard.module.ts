import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ChatStreamModule } from './../../components/knx-chat-stream/chat-stream.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
<<<<<<< HEAD
<<<<<<< HEAD
import { DashboardDetailComponent } from './dashboard-detail.component';
=======
>>>>>>> f5c3acd... refactor(dashboard): add chat service in the dashboard
=======
import { DashboardDetailComponent } from './dashboard-detail.component';
>>>>>>> 0d3cdfc... refactor(dashboard): add detail page for each product


@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    DashboardRoutingModule
  ],
  declarations: [
<<<<<<< HEAD
<<<<<<< HEAD
    DashboardComponent,
    DashboardDetailComponent
=======
    DashboardComponent
>>>>>>> f5c3acd... refactor(dashboard): add chat service in the dashboard
=======
    DashboardComponent,
    DashboardDetailComponent
>>>>>>> 0d3cdfc... refactor(dashboard): add detail page for each product
  ]
})
export class DashboardModule {
}
