import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared.module';
import { ChatStreamModule } from '@app/components/knx-chat-stream/chat-stream.module';
import { HouseHoldRoutingModule } from './house-hold-routing.module';

import { reducers } from './reducers';
import { HouseHoldService } from '@app/house/services/house-hold.service';
import { HouseHoldLocationComponent } from '@app/house/containers/house-hold-location/house-hold-location.component';
import { AddressModule } from '@app/address/address.module';
import { HouseHoldAdviceComponent } from '@app/house/containers/house-hold-advice/house-hold-advice.component';
import { HouseHoldHouseTypeComponent } from '@app/house/containers/house-hold-house-type/house-hold-house-type.component';
import { HouseHoldHouseDetailComponent } from '@app/house/containers/house-hold-house-detail/house-hold-house-detail.component';
import { RadioNavigatorComponent } from '@app/house/components/knx-radio-navigator/radio-navigator.component';
import { HouseHoldDekkingComponent } from '@app/house/containers/house-hold-dekking/house-hold-dekking.component';

@NgModule({
  declarations: [
    HouseHoldAdviceComponent,
    HouseHoldLocationComponent,
    HouseHoldHouseTypeComponent,
    HouseHoldHouseDetailComponent,
    HouseHoldDekkingComponent,
    RadioNavigatorComponent
  ],
  imports: [
    SharedModule,
    ChatStreamModule,
    AddressModule,
    HouseHoldRoutingModule,
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
