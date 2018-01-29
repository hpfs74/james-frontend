import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared.module';
import { ChatStreamModule } from '@app/components/knx-chat-stream/chat-stream.module';
import { InsuranceReviewModule } from '@app/components/knx-insurance-review/insurance-review.module';

import { TagsService } from '../../../core/services/tags.service';
import { TagsLoader } from '../../../utils/tagsloader';
import { HouseHoldEffects } from '@app/house/effects/house-hold';

// Smart components
import { reducers } from '@app/house/reducers';
import { HouseHoldService } from '@app/house/services/house-hold.service';
import { HouseHoldAdviceRoutingModule } from './house-hold-advice-routing.module';
import { HouseHoldLocationComponent } from './containers/house-hold-location/house-hold-location.component';
import { HouseHoldHouseTypeComponent } from './containers/house-hold-house-type/house-hold-house-type.component';
import { HouseHoldHouseDetailComponent } from './containers/house-hold-house-detail/house-hold-house-detail.component';
import { HouseHoldDekkingComponent } from './containers/house-hold-dekking/house-hold-dekking.component';
import { HouseHoldAdviceComponent } from './containers/house-hold-advice/house-hold-advice.component';
import { AddressModule } from '@app/address/address.module';

export const COMPONENTS = [
  HouseHoldAdviceComponent,
  HouseHoldLocationComponent,
  HouseHoldHouseTypeComponent,
  HouseHoldHouseDetailComponent,
  HouseHoldDekkingComponent
];

@NgModule({
  imports: [
    AddressModule,
    SharedModule,
    ChatStreamModule,
    InsuranceReviewModule,
    HouseHoldAdviceRoutingModule,
    StoreModule.forFeature('household', reducers),
    EffectsModule.forFeature([
      HouseHoldEffects
    ])
  ],
  declarations: [COMPONENTS],
  providers: [
    HouseHoldService
  ]
})
export class HouseHoldAdviceModule {
}
