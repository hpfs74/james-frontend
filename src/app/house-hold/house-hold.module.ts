import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { ChatStreamModule } from './../components/knx-chat-stream/chat-stream.module';
import { HouseHoldRoutingModule } from './house-hold-routing.module';



// Submodules


// import { reducers } from './reducers';
import { HouseHoldService } from '@app/house-hold/services/house-hold.service';
@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,

    HouseHoldRoutingModule,
    // StoreModule.forFeature('household', reducers),
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
