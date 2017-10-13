import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { AuthGuard, LoginGuard } from './services';
import { AuthService } from './services/auth.service';
import { LoginPageComponent } from './containers/login-page.component';
import { RegistrationPageComponent } from './containers/registration-page.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  }];
const registrationRoutes: Routes = [
  {
    path: 'register',
    component: RegistrationPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes),
    RouterModule.forChild(registrationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
