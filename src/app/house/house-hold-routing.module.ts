import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateCarFlowGuard } from '@core/services/car-guard.service';
import { CanActivateHouseHoldFlowGuard } from '@core/services/house-hold-guard.service';

export const houseHoldRoutes: Routes = [
  {
    path: '',
    loadChildren: './submodules/house-hold-advice/house-hold-advice.module#HouseHoldAdviceModule'
  },
  {
    path: 'premiums',
    canActivateChild: [CanActivateHouseHoldFlowGuard],
    loadChildren: './submodules/house-hold-premiums/house-hold-premiums.module#HouseHoldPremiumsModule'
  },
  {
    path: 'buy',
    loadChildren: './submodules/house-hold-buy/house-hold-buy.module#HouseHoldBuyModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(houseHoldRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HouseHoldRoutingModule {
}
