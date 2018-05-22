import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HouseHoldBuyDetailsComponent } from './containers/house-hold-buy-details/house-hold-buy-details.component';
import { HouseHoldPaymentDetailsComponent } from './containers/house-hold-payment-details/house-hold-payment-details.component';
import { HouseHoldBuyComponent } from './containers/house-hold-buy/house-hold-buy.component';
import { HouseHoldBuyLegalComponent } from './containers/house-hold-buy-legal/house-hold-buy-legal.component';
import { HouseHoldPremiumsThankYouComponent } from './containers/house-hold-premiums-thank-you/house-hold-premiums-thank-you.component';
import { CanActivateHouseHoldFlowGuard } from '@core/services';

export const houseHoldAdviceRoutes: Routes = [
  {
    path: '',
    component: HouseHoldBuyComponent,
    data: {
      title: 'House Hold Buy'
    },
    children: [
      {
        path: '',
        redirectTo: 'persoonlijke-gegevens',
        canActivate: [CanActivateHouseHoldFlowGuard],
        pathMatch: 'full'
      },
      {
        path: 'persoonlijke-gegevens',
        component: HouseHoldBuyDetailsComponent,
        //  canActivate: [CanActivateHouseHoldFlowGuard],
        data: {
          stepIndex: 0,
          step_nr: '70'
        },
      },
      {
        path: 'check',
        component: HouseHoldBuyLegalComponent,
        canActivate: [CanActivateHouseHoldFlowGuard],
        data: {
          stepIndex: 1,
          step_nr: '80'
        }
      },
      {
        path: 'betaling',
        component: HouseHoldPaymentDetailsComponent,
        canActivate: [CanActivateHouseHoldFlowGuard],
        data: {
          stepIndex: 2,
          step_nr: '90'
        }
      },
      {
        path: 'bedankt',
        canActivate: [CanActivateHouseHoldFlowGuard],
        component: HouseHoldPremiumsThankYouComponent,
        data: {
          stepIndex: 3,
          step_nr: '100-end'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(houseHoldAdviceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HouseHoldBuyRoutingModule {
}
