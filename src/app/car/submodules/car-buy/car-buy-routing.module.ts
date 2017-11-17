import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarBuyComponent } from './containers/car-buy.component';
import { CarThankYouComponent } from './components/car-thank-you/car-thank-you.component';

export const carBuyRoutes: Routes = [
  {
    path: '',
    component: CarBuyComponent,
    data: {
      title: 'Nieuwe autoverzekering aanvragen'
    }
  },
  {
    path: 'thank-you/:email',
    component: CarThankYouComponent
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
