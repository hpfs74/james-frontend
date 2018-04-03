import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseHoldBuyComponent } from './containers/house-hold-buy.component/house-hold-buy.component';
import { HouseHoldBuyDetailsComponent } from './containers/house-hold-buy-details/house-hold-buy-details.component';
import { HouseHoldPaymentDetailsComponent } from './containers/house-hold-payment-details/house-hold-payment-details.component';

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
        path: 'payment-details',
        component: HouseHoldPaymentDetailsComponent,
        data: {
          stepIndex: 2,
          step_nr: '30-details'
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
