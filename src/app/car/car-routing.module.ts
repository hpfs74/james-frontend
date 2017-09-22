import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarAdviceComponent } from './containers/car-advice.component';
import { CarBuyComponent } from './containers/car-buy.component';
import { CarThankYouComponent } from './containers/car-thank-you.component';

import { CanActivateBuyFlowGuard } from '../core/services/buy-guard.service';

export const carRoutes: Routes = [
  {
    path: '',
    component: CarAdviceComponent,
    data: {
      title: 'Je autoverzekering vergelijken'
    }
  },
  {
    path: 'insurance',
    component: CarBuyComponent,
    canActivate: [CanActivateBuyFlowGuard],
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
    RouterModule.forChild(carRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarRoutingModule { }
