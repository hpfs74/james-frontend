import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateBuyFlowGuard } from '../core/services/buy-guard.service';

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
export class CarRoutingModule {}
