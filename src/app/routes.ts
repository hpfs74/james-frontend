import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthGuard } from './auth/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'car',
    pathMatch: 'full',
    canActivateChild: [AuthGuard]
    // loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'car',
    canActivateChild: [AuthGuard],
    loadChildren: './car/car.module#CarModule'
  },
  {
    path: 'account',
    canActivateChild: [AuthGuard],
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    // 404: redirect unkown paths to home
    path: '**',
    redirectTo: ''
  }
];
