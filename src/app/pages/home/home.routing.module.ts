import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/auth-guard.service';
import { HomeComponent } from './home.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
import { Address } from './../../models/address';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        // component: DashboardComponent,
        data: {
          breadcrumb: 'Overzicht'
        },
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
      // {
      //   path: 'faq',
      //   canActivateChild: [AuthGuard],
      //   // component: DashboardComponent, //FaqComponent
      //   data: {
      //     breadcrumb: 'FAQ'
      //   }
      // },
      // {
      //   path: 'about',
      //   canActivateChild: [AuthGuard],
      //   // component: DashboardComponent, //AboutComponent
      //   data: {
      //     breadcrumb: 'Over ons'
      //   }
      // },
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
      providers: [AuthService, AuthGuard]
    };
  }
}
