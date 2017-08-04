import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared.module';
import { ChatStreamModule } from './../../components/knx-chat-stream/chat-stream.module';
import { CarRoutingModule } from './car-routing.module';

import { CarService } from './car.service';
import { CarAdviceComponent } from './advice/car-advice.component';
import { CarDetailComponent } from './advice/car-detail.component';
import { CarExtrasComponent } from './advice/car-extras.component';

import { CarBuyComponent } from './buy/car-buy.component';
import { CarContactComponent } from './buy/car-contact.component';
import { CarReportingCodeComponent } from './buy/car-reporting-code.component';
import { CarCheckComponent } from './buy/car-check.component';
import { CarPaymentComponent } from './buy/car-payment.component';
import { CarSummaryComponent } from './buy/car-summary.component';

import { CarEffects } from '../../effects/car';

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    CarRoutingModule,
    EffectsModule.forFeature([
      CarEffects
    ])
  ],
  declarations: [
    CarAdviceComponent,
    CarDetailComponent,
    CarExtrasComponent,
    CarBuyComponent,
    CarContactComponent,
    CarReportingCodeComponent,
    CarCheckComponent,
    CarPaymentComponent,
    CarSummaryComponent
  ],
  providers: [
    CarService
  ]
})
export class CarModule {
}
