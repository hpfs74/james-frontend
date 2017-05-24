import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
<<<<<<< HEAD
import { DashboardDetailComponent } from '../dashboard/dashboard-detail.component';
=======
>>>>>>> f5c3acd... refactor(dashboard): add chat service in the dashboard

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Overzicht'
    }
<<<<<<< HEAD
  },
  {
    path: 'cars',
    component: DashboardDetailComponent,
    data: {
      breadcrumb: 'Je autoverzekering',
      insuranceType: 'car'
    }
  },
  {
    path: 'reis',
    component: DashboardDetailComponent,
    data: {
      breadcrumb: 'Je reisverzekering',
      insuranceType: 'reis'
    }
  }

=======
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
>>>>>>> f5c3acd... refactor(dashboard): add chat service in the dashboard
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
