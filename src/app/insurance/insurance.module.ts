import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { InsuranceService } from './services/insurance.service';

import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('insurance', reducers)
  ]
})
export class InsuranceModule {
  static forRoot() {
    return {
      ngModule: InsuranceModule,
      providers: [
        InsuranceService
      ],
    };
  }
}



