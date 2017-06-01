import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { CarBuyComponent } from './car-buy.component';

export const carRoutes: Routes = [
  {
    path: '',
    component: CarComponent,
    data: {
      breadcrumb: 'Je autoverzekering vergelijken'
    }
  },
  {
    path: 'get-insurance',
    component: CarBuyComponent,
    data: {
      breadcrumb: 'Nieuwe autoverzekering aanvragen'
    }
  }
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
