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

import { CarAdviceComponent } from './containers/car-advice/car-advice.component';
import { CarSavedComponent } from './containers/car-saved/car-saved.component';
import { CarDetailComponent } from './containers/car-detail/car-detail.component';
import { CarExtrasComponent } from './containers/car-extras/car-extras.component';
import { CarReviewComponent } from './containers/car-review/car-review.component';
import { CarThankYouComponent } from './containers/car-thank-you/car-thank-you.component';

import { CarEffects } from '../../../car/effects/car';
import { reducers } from '../../../car/reducers';
import { InsuranceTopListComponent } from './containers/insurance-toplist/insurance-toplist.component';

export const COMPONENTS = [
  CarAdviceComponent,
  CarSavedComponent,
  CarDetailComponent,
  CarExtrasComponent,
  InsuranceTopListComponent,
  CarReviewComponent,
  CarThankYouComponent
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
