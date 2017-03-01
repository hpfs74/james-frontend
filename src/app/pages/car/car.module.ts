import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

// @cx
import { CXFormsModule } from '../../../../node_modules/@cx/forms';

import { CarRoutingModule } from './car-routing.module';
import { CarPageComponent } from '../car/car-page.component';
import { CarDetailPageComponent } from '../car/car-detail-page.component';

@NgModule({
  imports: [
    SharedModule,
    CarRoutingModule,
    CXFormsModule
  ],
  declarations: [
    CarPageComponent,
    CarDetailPageComponent
  ]
})
export class CarModule { }
