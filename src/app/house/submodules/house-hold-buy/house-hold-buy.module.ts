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
import { HouseHoldBuyDetailsComponent  } from './containers/house-hold-buy-details/house-hold-buy-details.component';
import { HouseHoldPaymentDetailsComponent } from './containers/house-hold-payment-details/house-hold-payment-details.component';
import { HouseHoldBuyLegalComponent } from './containers/house-hold-buy-legal/house-hold-buy-legal.component';
import { HouseHoldBuyComponent } from './containers/house-hold-buy/house-hold-buy.component';


export const COMPONENTS = [
  HouseHoldBuyComponent,
  HouseHoldBuyDetailsComponent,
  HouseHoldPaymentDetailsComponent,
  HouseHoldBuyLegalComponent
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
