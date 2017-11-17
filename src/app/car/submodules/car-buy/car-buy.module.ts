import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../../shared.module';
import { ChatStreamModule } from './../../../components/knx-chat-stream/chat-stream.module';
import { InsuranceReviewModule } from './../../../components/knx-insurance-review/insurance-review.module';
import { CarBuyRoutingModule } from './car-buy-routing.module';

import { CarService } from '../../../car/services/car.service';
import { TagsService } from '../../../core/services/tags.service';
import { TagsLoader } from '../../../utils/tagsloader';

// Smart components
import { CarBuyComponent } from './containers/car-buy.component';

// Dumb components
import { CarContactComponent } from './components/car-contact/car-contact.component';
import { CarReportingCodeComponent } from './components/car-reporting/car-reporting-code.component';
import { CarCheckComponent } from './components/car-check/car-check.component';
import { CarPaymentComponent } from './components/car-payment/car-payment.component';
import { CarSummaryComponent } from './components/car-summary/car-summary.component';

import { CarEffects } from '../../../car/effects/car';

import { reducers } from '../../../car/reducers';

export const COMPONENTS = [
  CarBuyComponent,
  CarContactComponent,
  CarReportingCodeComponent,
  CarCheckComponent,
  CarPaymentComponent,
  CarSummaryComponent
];

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    InsuranceReviewModule,
    CarBuyRoutingModule,
    StoreModule.forFeature('car', reducers),
    EffectsModule.forFeature([
      CarEffects
    ])
  ],
  declarations: [ COMPONENTS ],
  providers: [
    CarService
  ]
})
export class CarBuyModule { }
