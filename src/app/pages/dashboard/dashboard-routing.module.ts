import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardDetailComponent } from './dashboard-detail.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Overzicht'
    },
    children: [
      {
        path: 'go/:type',
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
