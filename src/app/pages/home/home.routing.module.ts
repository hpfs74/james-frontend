import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/auth-guard.service';
import { HomeComponent } from './home.component';
import { OverviewComponent } from '../overview/overview.component';
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
        component: OverviewComponent,
        data: {
          breadcrumb: 'Overzicht'
        }
      },
      {
        path: 'car',
        canActivateChild: [AuthGuard],
        loadChildren: '../car/car.module#CarModule'
      },
      {
        path: 'profile',
        canActivateChild: [AuthGuard],
        component: OverviewComponent, //UserProfileComponent
        data: {
          breadcrumb: 'Mijn account'
        }
      },
      {
        path: 'faq',
        canActivateChild: [AuthGuard],
        component: OverviewComponent, //FaqComponent
        data: {
          breadcrumb: 'FAQ'
        }
      },
      {
        path: 'about',
        canActivateChild: [AuthGuard],
        component: OverviewComponent, //AboutComponent
        data: {
          breadcrumb: 'Over ons'
        }
      },
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
