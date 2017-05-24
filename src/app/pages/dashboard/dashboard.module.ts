import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ChatStreamModule } from './../../components/knx-chat-stream/chat-stream.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDetailComponent } from './dashboard-detail.component';


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
