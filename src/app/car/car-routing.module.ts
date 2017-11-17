import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateBuyFlowGuard } from '../core/services/buy-guard.service';
import { CarPurchasedComponent } from './submodules/car-advice/containers/car-purchased/car-purchased.component';
import { CarThankYouComponent } from './submodules/car-advice/components/car-thank-you/car-thank-you.component';

export const carRoutes: Routes = [
  {
    path: '',
    loadChildren: './submodules/car-advice/car-advice.module#CarAdviceModule'
  },
  {
    path: 'insurance',
    canActivateChild: [CanActivateBuyFlowGuard],
    loadChildren: './submodules/car-buy/car-buy.module#CarBuyModule'
  },
  {
    path: 'thank-you/:email',
    component: CarThankYouComponent
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
