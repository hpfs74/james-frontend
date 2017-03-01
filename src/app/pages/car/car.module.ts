import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from '../car/car.component';

@NgModule({
  imports: [
    SharedModule,
    CarRoutingModule
  ],
  declarations: [
    CarComponent
  ]
})
export class CarModule { }
