import { Address } from './../../models/address';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services/auth.guard.service';

import { HomeComponent } from './home.component';
import { OverviewComponent } from '../overview/overview.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        data: {
          breadcrumb: 'Overzicht'
        }
      },
      {
        path: 'car',
        loadChildren: '../car/car.module#CarModule'
      },
      {
        path: 'profile',
        component: OverviewComponent, //UserProfileComponent
        data: {
          breadcrumb: 'Mijn account'
        }
      },
      {
        path: 'faq',
        component: OverviewComponent, //FaqComponent
        data: {
          breadcrumb: 'FAQ'
        }
      },
      {
        path: 'about',
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
export class HomeRoutingModule { }
