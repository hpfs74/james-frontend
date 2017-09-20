import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../auth/services/auth-guard.service';
import { HomeComponent } from './home.component';
import { FaqComponent } from '../faq/faq.component';
import { ThankYouComponent } from '../thank-you/thank-you.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        loadChildren: '../dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'car',
        canActivateChild: [AuthGuard],
        loadChildren: '../car/car.module#CarModule'
      },
      {
        path: 'profile',
        canActivateChild: [AuthGuard],
        loadChildren: '../profile/profile.module#ProfileModule'
      },
      {
        path: 'faq',
        canActivateChild: [AuthGuard],
        component: FaqComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HomeRoutingModule,
      providers: [AuthGuard]
    };
  }
}
