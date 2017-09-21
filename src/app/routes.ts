import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthGuard } from './auth/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './core/core.module#CoreModule',
    canLoad: [AuthGuard]
  },
  {
    // 404: redirect unkown paths to home
    path: '**',
    redirectTo: ''
  }
];
