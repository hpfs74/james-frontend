import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './containers/dashboard.component';
import { DashboardDetailComponent } from './containers/dashboard-detail.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Overzicht'
    },
    children: [
      {
        path: 'insurance/:type',
        component: DashboardDetailComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
