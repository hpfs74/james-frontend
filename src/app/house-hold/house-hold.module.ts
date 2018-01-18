import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared.module';
import { ChatStreamModule } from '@app/components/knx-chat-stream/chat-stream.module';
import { HouseHoldRoutingModule } from './house-hold-routing.module';

import { reducers } from './reducers';
import { HouseHoldService } from '@app/house-hold/services/house-hold.service';
import { HouseHoldLocationComponent } from '@app/house-hold/containers/house-hold-location/house-hold-location.component';
import { AddressModule } from '@app/address/address.module';
import { HouseHoldAdviceComponent } from '@app/house-hold/containers/house-hold-advice/house-hold-advice.component';

@NgModule({
  declarations: [
    HouseHoldAdviceComponent,
    HouseHoldLocationComponent
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
