import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { ChatStreamModule } from './../components/knx-chat-stream/chat-stream.module';
import { InsuranceReviewModule } from './../components/knx-insurance-review/insurance-review.module';
import { CarRoutingModule } from './car-routing.module';

import { CarService } from './services/car.service';
import { TagsService } from '../core/services/tags.service';
import { TagsLoader } from '../utils/tagsloader';

// Submodules
import { CarAdviceModule } from './submodules/car-advice/car-advice.module';
import { CarBuyModule } from './submodules/car-buy/car-buy.module';

import { CarEffects } from './effects/car';
import { CompareEffects } from './effects/compare';
import { CoverageEffects } from './effects/coverage';

import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    InsuranceReviewModule,
    CarAdviceModule,
    CarBuyModule,
    CarRoutingModule,
    StoreModule.forFeature('car', reducers),
    EffectsModule.forFeature([
      CarEffects,
      CompareEffects,
      CoverageEffects
    ])
  ],
  providers: [
    CarService
  ]
})
export class CarModule {}
