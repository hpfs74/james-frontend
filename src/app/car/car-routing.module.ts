import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateBuyFlowGuard } from '../core/services/buy-guard.service';
import { CarAdviceComponent } from './containers/car-advice.component';
import { CarPurchasedComponent } from './containers/car-purchased.component';

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
    canActivateChild: [CanActivateBuyFlowGuard],
    loadChildren: '../car-buy/car-buy.module#CarBuyModule'
  },
  {
    path: 'purchased',
    component: CarPurchasedComponent
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
