import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardDetailComponent } from '../dashboard/dashboard-detail.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Overzicht'
    },
    children: [
      {
        path: 'car',
        component: DashboardDetailComponent,
        data: {
          breadcrumb: 'Je autoverzekering',
          insuranceType: 'car'
        }
      }
    ]
    // children: [
    //   {
    //     path: 'advice',
    //     component: CarAdviceComponent,
    //     data: {
    //       breadcrumb: 'Autoverzekering vergelijken'
    //     }
    //   }
    // ]
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
