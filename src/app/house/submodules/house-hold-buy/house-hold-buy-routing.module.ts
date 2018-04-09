import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HouseHoldBuyDetailsComponent } from './containers/house-hold-buy-details/house-hold-buy-details.component';
import { HouseHoldPaymentDetailsComponent } from './containers/house-hold-payment-details/house-hold-payment-details.component';
import { HouseHoldBuyComponent } from './containers/house-hold-buy/house-hold-buy.component';
import { HouseHoldBuyLegalComponent } from './containers/house-hold-buy-legal/house-hold-buy-legal.component';
import { HouseHoldPremiumsThankYouComponent } from './containers/house-hold-premiums-thank-you/house-hold-premiums-thank-you.component';

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
        redirectTo: 'buy-details',
        pathMatch: 'full'
      },
      {
        path: 'buy-details',
        component: HouseHoldBuyDetailsComponent,
        data: {
          stepIndex: 0,
          step_nr: '10-start'
        },
      },
      {
        path: 'legal',
        component: HouseHoldBuyLegalComponent,
        data: {
          stepIndex: 1,
          step_nr: '20'
        }
      },
      {
        path: 'payment-details',
        component: HouseHoldPaymentDetailsComponent,
        data: {
          stepIndex: 2,
          step_nr: '30-details'
        }
      },
      {
        path: 'bedankt',
        component: HouseHoldPremiumsThankYouComponent,
        data: {
          stepIndex: 3,
          step_nr: '80-end'
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
