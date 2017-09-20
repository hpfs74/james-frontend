import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ChatStreamModule } from '../components/knx-chat-stream/chat-stream.module';

import { DashboardComponent } from './containers/dashboard.component';
import { DashboardDetailComponent } from './containers/dashboard-detail.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    DashboardDetailComponent
  ]
})
export class DashboardModule {
}
