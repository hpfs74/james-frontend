import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { LoginPageComponent } from './containers/login-page.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
