import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { InsuranceService } from './services/insurance.service';
import { AdviceService } from './services/advice.service';
import { InsuranceEffects } from './effects/insurance';
import { AdviceEffects } from './effects/advice';

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
        InsuranceService,
        AdviceService
      ],
    };
  }
}



