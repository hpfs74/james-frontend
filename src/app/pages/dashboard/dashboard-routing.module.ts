import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Overzicht'
    }
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
