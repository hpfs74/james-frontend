import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from '../car/car.component';
import { CarDetailComponent } from '../car/car-detail.component';

const carRoutes: Routes = [
  {
    path: 'car',
    component: CarDetailComponent,
    data: {
      breadcrumb: 'Je autoverzekering vergelijken'
    }
  },
  { path: 'car2', component: CarComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(carRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarRoutingModule { }
