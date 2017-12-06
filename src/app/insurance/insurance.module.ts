import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { InsuranceEffects } from './effects/insurance';
import { AdviceEffects } from './effects/advice';
import { AdviceService, BuyService, InsuranceService } from './services';

import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('insurance', reducers),
    EffectsModule.forFeature([
      InsuranceEffects,
      AdviceEffects
    ])
  ]
})
export class InsuranceModule {
  static forRoot() {
    return {
      ngModule: InsuranceModule,
      providers: [
        AdviceService,
        BuyService,
        InsuranceService
      ],
    };
  }
}



