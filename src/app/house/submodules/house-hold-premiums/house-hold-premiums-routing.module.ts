import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseHoldPremiumsDetailComponent } from './containers/house-hold-premiums-detail/hould-hold-premiums-detail.component';
import { HouseHoldPremiumsListComponent } from './containers/house-hold-premiums-list/house-hold-premiums-list.component';
import { HouseHoldPremiumsComponent } from './containers/house-hold-premiums/house-hold-premiums.component';

export const houseHoldPremiumsRoutes: Routes = [
  {
    path: 'premiums',
    component: HouseHoldPremiumsComponent,
    data: {
      title: '...'
    },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: HouseHoldPremiumsListComponent
      },
      {
        path: 'detail',
        component: HouseHoldPremiumsDetailComponent
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
export class HouseHoldPremiumsRoutingModule {}
