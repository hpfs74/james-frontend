import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HouseHoldLocationComponent } from '@app/house-hold/containers/house-hold-location/house-hold-location.component';
import { HouseHoldAdviceComponent } from '@app/house-hold/containers/house-hold-advice/house-hold-advice.component';
import { CarDetailComponent } from '@car/submodules/car-advice/containers/car-detail/car-detail.component';

export const houseHoldRoutes: Routes = [
  {
    path: '',
    component: HouseHoldAdviceComponent,
    data: {
      title: 'House Hold'
    },
    children: [
      {path: '', redirectTo: 'locatie', pathMatch: 'full'},
      {
        path: 'locatie',
        component: HouseHoldLocationComponent,
        data: {stepIndex: 0}
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
