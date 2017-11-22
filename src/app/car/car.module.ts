import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { AddressModule } from '../address/address.module';
import { ChatStreamModule } from './../components/knx-chat-stream/chat-stream.module';
import { InsuranceReviewModule } from './../components/knx-insurance-review/insurance-review.module';
import { CarRoutingModule } from './car-routing.module';

import { CarService } from './services/car.service';
import { TagsService } from '../core/services/tags.service';
import { TagsLoader } from '../utils/tagsloader';

// Smart components / page containers
import { CarAdviceComponent } from './containers/car-advice.component';
import { CarPurchasedComponent } from './containers/car-purchased.component';
import { CarThankYouComponent } from './containers/car-thank-you.component';

// Dumb components
import { CarDetailComponent } from './components/car-detail.component';
import { CarExtrasComponent } from './components/car-extras.component';

import { CarEffects } from './effects/car';
import { CompareEffects } from './effects/compare';
import { CoverageEffects } from './effects/coverage';

import { reducers } from './reducers';

export const COMPONENTS = [
  CarAdviceComponent,
  CarPurchasedComponent,
  CarDetailComponent,
  CarExtrasComponent,
  CarThankYouComponent
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
export class CarModule {}
