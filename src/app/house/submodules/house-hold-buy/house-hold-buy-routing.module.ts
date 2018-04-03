import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseHoldBuyComponent } from '@app/house/submodules/house-hold-buy/containers/house-hold-buy/house-hold-buy.component';
import {
  HouseHoldBuyDetailsComponent
} from '@app/house/submodules/house-hold-buy/containers/house-hold-buy-details/house-hold-buy-details.component';
import {
  HouseHoldBuyLegalComponent
} from '@app/house/submodules/house-hold-buy/containers/house-hold-buy-legal/house-hold-buy-legal.component';

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
        component: HouseHoldBuyDetailsComponent,
        data: {
          stepIndex: 0,
          step_nr: '10-start'
        }
      },
      {
        path: 'legal',
        component: HouseHoldBuyLegalComponent,
        data: {
          stepIndex: 1,
          step_nr: '20'
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
