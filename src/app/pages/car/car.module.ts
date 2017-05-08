import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ChatStreamModule } from './../../components/knx-chat-stream/chat-stream.module';
import { CarRoutingModule } from './car-routing.module';

import { CarService } from './car.service';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { CarResultComponent } from './car-results.component';

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    CarRoutingModule
  ],
  declarations: [
    CarComponent,
    CarDetailComponent,
    CarResultComponent
  ],
  providers: [
    CarService
  ]
})
export class CarModule {
}
