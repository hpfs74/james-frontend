import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared.module';
import { ChatStreamModule } from '@app/components/knx-chat-stream/chat-stream.module';
import { InsuranceReviewModule } from '@app/components/knx-insurance-review/insurance-review.module';

import { TagsService } from '@app/core/services/tags.service';
import { TagsLoader } from '@app/utils/tagsloader';
import { HouseHoldEffects } from '@app/house/effects/house-hold';

// Smart components
import { reducers } from '@app/house/reducers';
import { HouseHoldService } from '@app/house/services/house-hold.service';
import { HouseHoldBuyRoutingModule } from './house-hold-buy-routing.module';
import { AddressModule } from '@app/address/address.module';
import { HouseDataEffects } from '@app/house/effects/house-data';
import { HouseHoldBuyComponent } from '@app/house/submodules/house-hold-buy/containers/house-hold-buy.component/house-hold-buy.component';
import {
  HouseHoldBuyDetailsComponent
} from '@app/house/submodules/house-hold-buy/containers/house-hold-buy-details/house-hold-buy-details.component';

export const COMPONENTS = [
  HouseHoldBuyComponent,
  HouseHoldBuyDetailsComponent
];

@NgModule({
  imports: [
    AddressModule,
    SharedModule,
    ChatStreamModule,
    InsuranceReviewModule,
    HouseHoldBuyRoutingModule,
    StoreModule.forFeature('household', reducers),
    EffectsModule.forFeature([
      HouseDataEffects,
      HouseHoldEffects
    ])
  ],
  declarations: [COMPONENTS],
  providers: [
    HouseHoldService
  ]
})
export class HouseHoldBuyModule {
}
