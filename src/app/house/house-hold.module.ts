import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared.module';
import { ChatStreamModule } from '@app/components/knx-chat-stream/chat-stream.module';

import { reducers } from './reducers';
import { HouseHoldService } from '@app/house/services/house-hold.service';
import { HouseHoldPremiumsModule } from '@app/house/submodules/house-hold-premiums/house-hold-premiums.module';
import { HouseHoldAdviceModule } from '@app/house/submodules/house-hold-advice/house-hold-advice.module';
import { HouseHoldRoutingModule } from '@app/house/house-hold-routing.module';
import { HouseHoldBuyModule } from '@app/house/submodules/house-hold-buy/house-hold-buy.module';

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    HouseHoldRoutingModule,
    HouseHoldAdviceModule,
    HouseHoldPremiumsModule,
    HouseHoldBuyModule,
    StoreModule.forFeature('household', reducers),
    EffectsModule.forFeature([
      // HouseHoldEffects,
      // CompareEffects,
      // CoverageEffects
    ])
  ],
  providers: [
    HouseHoldService
  ]
})
export class HouseHoldModule {}
