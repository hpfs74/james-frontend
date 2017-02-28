import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { VehicleInfoComponent } from '../../components/ki-vehicle-info/vehicle-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CarRoutingModule
  ],
  declarations: [
    CarComponent,
    VehicleInfoComponent
  ]
})
export class CarModule { }
