import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseHoldPremiumsDetailComponent } from './containers/house-hold-premiums-detail/house-hold-premiums-detail.component';
import { HouseHoldPremiumsListComponent } from './containers/house-hold-premiums-list/house-hold-premiums-list.component';
import { HouseHoldPremiumsComponent } from './containers/house-hold-premiums/house-hold-premiums.component';
import { HouseHoldPremiumsBuyComponent } from './containers/house-hold-premiums-buy/house-hold-premiums-buy.component';

export const houseHoldPremiumsRoutes: Routes = [
  {
    path: '',
    component: HouseHoldPremiumsComponent,
    data: {
      title: '...'
    },
    children: [
      {
        path: '',
        redirectTo: 'advies',
        pathMatch: 'full'
      },
      {
        path: 'advies',
        component: HouseHoldPremiumsListComponent,
        data: {
          stepIndex: 0,
          step_nr: '50'
        }
      },
      {
        path: 'advies-detail',
        component: HouseHoldPremiumsDetailComponent,
        data: {
          stepIndex: 1,
          step_nr: '60'
        }
      },
      {
        path: 'bevestig',
        component: HouseHoldPremiumsBuyComponent,
        data: {
          stepIndex: 2,
          step_nr: '70'
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
