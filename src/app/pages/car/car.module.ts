import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CarRoutingModule } from './car-routing.module';

import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { CarService } from './car.service';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';

@NgModule({
  imports: [
    SharedModule,
    CarRoutingModule
  ],
  declarations: [
    CarComponent,
    CarDetailComponent
  ],
  providers: [
    CarService,
    ChatStreamService
  ]
})
export class CarModule {
}
