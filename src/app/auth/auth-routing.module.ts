import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { AuthGuard, LoginGuard } from './services';
import { AuthService } from './services/auth.service';
import { LoginPageComponent } from './containers/login-page.component';
import { RegistrationPageComponent } from './containers/registration-page.component';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
