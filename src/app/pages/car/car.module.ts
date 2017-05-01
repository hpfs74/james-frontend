import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CarRoutingModule } from './car-routing.module';

import { CarService } from './car.service';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { CarCoverageComponent } from './car-coverage.component';

@NgModule({
  imports: [
    SharedModule,
    CarRoutingModule
  ],
  declarations: [
    CarComponent,
    CarDetailComponent,
    CarCoverageComponent
  ],
  providers: [
    CarService
  ]
})
export class CarModule {
}
