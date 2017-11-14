import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { AuthGuard, LoginGuard } from './services';
import { AuthService } from './services/auth.service';

const authRoutes: Routes = [
  {
    path: 'login',
    loadChildren: '../auth-login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: '../auth-registration/registration.module#RegistrationModule'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
