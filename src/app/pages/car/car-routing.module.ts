import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarAdviceComponent } from './advice/car-advice.component';
import { CarDetailComponent } from './advice/car-detail.component';
import { CarBuyComponent } from './buy/car-buy.component';

export const carRoutes: Routes = [
  {
    path: '',
    component: CarAdviceComponent,
    data: {
      breadcrumb: 'Je autoverzekering vergelijken'
    }
  },
  {
    path: 'insurance',
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
