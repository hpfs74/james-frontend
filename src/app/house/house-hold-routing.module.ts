import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HouseHoldLocationComponent } from '@app/house/containers/house-hold-location/house-hold-location.component';
import { HouseHoldAdviceComponent } from '@app/house/containers/house-hold-advice/house-hold-advice.component';
import { HouseHoldHouseTypeComponent } from '@app/house/containers/house-hold-house-type/house-hold-house-type.component';
import { HouseHoldHouseDetailComponent } from '@app/house/containers/house-hold-house-detail/house-hold-house-detail.component';
import { HouseHoldDekkingComponent } from '@app/house/containers/house-hold-dekking/house-hold-dekking.component';

export const houseHoldRoutes: Routes = [
  {
    path: '',
    component: HouseHoldAdviceComponent,
    data: {
      title: 'House Hold'
    },
    children: [
      {
        path: '',
        redirectTo: 'locatie',
        pathMatch: 'full'
      },
      {
        path: 'locatie',
        component: HouseHoldLocationComponent,
        data: {
          stepIndex: 0
        }
      },
      {
        path: 'huis-type',
        component: HouseHoldHouseTypeComponent,
        data: {
          stepIndex: 1
        }
      },
      {
        path: 'huis-detail',
        component: HouseHoldHouseDetailComponent,
        data: {
          stepIndex: 2
        }
      },
      {
        path: 'dekking',
        component: HouseHoldDekkingComponent,
        data: {
          stepIndex: 3
        }
      }
    ]
  }
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
