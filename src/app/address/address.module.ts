
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { AddressService } from './services/address.service';

import { reducers } from './reducers';
import { AddressEffects } from './effects/address.effects';
import { AddressComponent } from './components/address.component';
import { AddressLookupComponent } from './containers/address-lookup.component';

export const COMPONENTS = [
  AddressComponent,
  AddressLookupComponent
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('address', reducers),
    EffectsModule.forFeature([
      AddressEffects
    ])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AddressModule {
  static forRoot() {
    return {
      ngModule: AddressModule,
      providers: [
        AddressService
      ]
    };
  }
}
