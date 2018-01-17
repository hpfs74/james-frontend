import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateCarFlowGuard } from '../core/services/car-guard.service';

export const carRoutes: Routes = [
  {
    path: '',
    loadChildren: './submodules/car-advice/car-advice.module#CarAdviceModule'
  },
  {
    path: 'insurance',
    canActivateChild: [CanActivateCarFlowGuard],
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
export class HouseHoldRoutingModule {}
