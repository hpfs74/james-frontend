import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from '../car/car.component';
import { CarDetailComponent } from '../car/car-detail.component';

@NgModule({
  imports: [
    SharedModule,
    CarRoutingModule
  ],
  declarations: [
    CarComponent,
    CarDetailComponent
  ]
})
export class CarModule { }
