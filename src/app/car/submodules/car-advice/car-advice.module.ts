import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../../shared.module';
import { ChatStreamModule } from './../../../components/knx-chat-stream/chat-stream.module';
import { InsuranceReviewModule } from './../../../components/knx-insurance-review/insurance-review.module';
import { CarAdviceRoutingModule } from './car-advice-routing.module';
import { AddressModule } from '../../../address/address.module';

import { CarService } from '../../../car/services/car.service';
import { TagsService } from '../../../core/services/tags.service';
import { TagsLoader } from '../../../utils/tagsloader';

// Smart components
import { CarAdviceComponent } from './containers/car-advice/car-advice.component';
import { CarPurchasedComponent } from './containers/car-purchased/car-purchased.component';
// Dumb components
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarExtrasComponent } from './components/car-extras/car-extras.component';
import { KNXWizardRxComponent } from '../../../components/knx-wizard-rx/knx-wizard-rx.component';

import { CarEffects } from '../../../car/effects/car';
import { reducers } from '../../../car/reducers';
import { InsuranceTopListComponent } from './components/insurance-toplist/insurance-toplist.component';

export const COMPONENTS = [
  CarAdviceComponent,
  CarPurchasedComponent,
  CarDetailComponent,
  CarExtrasComponent,
  KNXWizardRxComponent,
  InsuranceTopListComponent
];

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    AddressModule,
    InsuranceReviewModule,
    CarAdviceRoutingModule,
    StoreModule.forFeature('car', reducers),
    EffectsModule.forFeature([
      CarEffects
    ])
  ],
  declarations: [ COMPONENTS ],
  providers: [
    CarService
  ]
})
export class CarAdviceModule { }
