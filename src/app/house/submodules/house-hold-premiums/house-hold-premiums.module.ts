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
import { HouseHoldPremiumsComponent } from './containers/house-hold-premiums/house-hold-premiums.component';
import { HouseHoldPremiumsListComponent } from './containers/house-hold-premiums-list/house-hold-premiums-list.component';
import { HouseHoldPremiumsDetailComponent } from './containers/house-hold-premiums-detail/hould-hold-premiums-detail.component';
import { HouseHoldPremiumsRoutingModule } from './house-hold-premiums-routing.module';
import { HouseHoldService } from '@app/house/services/house-hold.service';

export const COMPONENTS = [
  HouseHoldPremiumsComponent,
  HouseHoldPremiumsListComponent,
  HouseHoldPremiumsDetailComponent
];

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    InsuranceReviewModule,
    HouseHoldPremiumsRoutingModule,
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
export class HouseHoldPremiumsModule {
}