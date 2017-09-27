import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { AddressModule } from '../address/address.module';
import { ChatStreamModule } from './../components/knx-chat-stream/chat-stream.module';
import { InsuranceReviewModule } from './../components/knx-insurance-review/insurance-review.module';
import { CarRoutingModule } from './car-routing.module';

import { CarService } from './services/car.service';

// Smart components / page containers
import { CarAdviceComponent } from './containers/car-advice.component';
import { CarBuyComponent } from './containers/car-buy.component';
import { CarThankYouComponent } from './containers/car-thank-you.component';

// Dumb components
import { CarDetailComponent } from './components/advice/car-detail.component';
import { CarExtrasComponent } from './components/advice/car-extras.component';

import { CarContactComponent } from './components/buy/car-contact.component';
import { CarReportingCodeComponent } from './components/buy/car-reporting-code.component';
import { CarCheckComponent } from './components/buy/car-check.component';
import { CarPaymentComponent } from './components/buy/car-payment.component';
import { CarSummaryComponent } from './components/buy/car-summary.component';

import { CarEffects } from './effects/car';
import { CompareEffects } from './effects/compare';
import { CoverageEffects } from './effects/coverage';

import { reducers } from './reducers';

export const COMPONENTS = [
  CarAdviceComponent,
  CarBuyComponent,
  CarThankYouComponent,
  CarDetailComponent,
  CarExtrasComponent,
  CarContactComponent,
  CarReportingCodeComponent,
  CarCheckComponent,
  CarPaymentComponent,
  CarSummaryComponent
];

@NgModule({
  imports: [
    SharedModule,
    AddressModule,
    ChatStreamModule,
    InsuranceReviewModule,
    CarRoutingModule,
    StoreModule.forFeature('car', reducers),
    EffectsModule.forFeature([
      CarEffects,
      CompareEffects,
      CoverageEffects
    ])
  ],
  declarations: COMPONENTS,
  providers: [
    CarService
  ]
})
export class CarModule {
}
