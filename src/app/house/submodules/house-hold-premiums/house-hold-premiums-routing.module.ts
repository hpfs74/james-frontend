import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseHoldPremiumsDetailComponent } from './containers/house-hold-premiums-detail/house-hold-premiums-detail.component';
import { HouseHoldPremiumsListComponent } from './containers/house-hold-premiums-list/house-hold-premiums-list.component';
import { HouseHoldPremiumsComponent } from './containers/house-hold-premiums/house-hold-premiums.component';
import { HouseHoldPremiumsBuyComponent } from './containers/house-hold-premiums-buy/house-hold-premiums-buy.component';
import { HouseHoldPremiumsThankYouComponent } from './containers/house-hold-premiums-thank-you/house-hold-premiums-thank-you.component';

export const houseHoldPremiumsRoutes: Routes = [
  {
    path: 'premiums',
    component: HouseHoldPremiumsComponent,
    data: {
      title: '...'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: HouseHoldPremiumsListComponent,
        data: {
          stepIndex: 0
        }
      },
      {
        path: 'detail',
        component: HouseHoldPremiumsDetailComponent,
        data: {
          stepIndex: 1
        }
      },
      {
        path: 'buy',
        component: HouseHoldPremiumsBuyComponent,
        data: {
          stepIndex: 2
        }
      },
      {
        path: 'thank-you',
        component: HouseHoldPremiumsThankYouComponent,
        data: {
          stepIndex: 3
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(houseHoldPremiumsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HouseHoldPremiumsRoutingModule {
}
