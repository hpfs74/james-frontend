import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateBuyFlowGuard } from '../core/services/buy-guard.service';
import { CarThankYouComponent } from './submodules/car-buy/components/car-thank-you/car-thank-you.component';

export const carRoutes: Routes = [
  {
    path: '',
    loadChildren: './submodules/car-advice/car-advice.module#CarAdviceModule'
  },
  {
    path: 'insurance',
    canActivateChild: [CanActivateBuyFlowGuard],
    loadChildren: './submodules/car-buy/car-buy.module#CarBuyModule'
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
