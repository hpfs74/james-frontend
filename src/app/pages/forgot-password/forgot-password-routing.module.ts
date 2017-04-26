import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordComponent } from './forgot-password.component';

const forgotPasswordRoutes: Routes = [
  { path: 'forgot', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(forgotPasswordRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ForgotPasswordRoutingModule { }
