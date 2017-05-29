import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardDetailComponent } from './dashboard-detail.component';

export const dashboardRoutes: Routes = [

  {
    path: 'cars',
    component: DashboardDetailComponent,
    data: {
      breadcrumb: 'Je autoverzekering'
    }
  },
  {
    path: 'reis',
    component: DashboardDetailComponent,
    data: {
      breadcrumb: 'Je reisverzekering'
    }
  },
  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Overzicht'
    }
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
