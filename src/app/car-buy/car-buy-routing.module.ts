import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarBuyComponent } from './containers/car-buy.component';

export const carBuyRoutes: Routes = [
  {
    path: '',
    component: CarBuyComponent,
    data: {
      title: 'Nieuwe autoverzekering aanvragen'
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(carBuyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarBuyRoutingModule { }
