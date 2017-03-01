import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

// @cx
import { CXFormsModule } from '../../../../node_modules/@cx/forms';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from '../car/car.component';
import { CarDetailComponent } from '../car/car-detail.component';

@NgModule({
  imports: [
    SharedModule,
    CarRoutingModule,
    CXFormsModule
  ],
  declarations: [
    CarComponent,
    CarDetailComponent
  ]
})
export class CarModule { }
