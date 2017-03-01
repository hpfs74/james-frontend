import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarPageComponent } from '../car/car-page.component';
import { CarDetailPageComponent } from '../car/car-detail-page.component';

const carRoutes: Routes = [
  {
    path: 'car',
    component: CarDetailPageComponent,
    data: {
      breadcrumb: 'Je autoverzekering vergelijken'
    }
  },
  { path: 'car2', component: CarPageComponent }
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
