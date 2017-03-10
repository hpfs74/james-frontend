import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard.service';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CookiesPageComponent } from './pages/cookies/cookies-page.component';

import { HomeModule } from './pages/home/home.module';

//TODO: add canActivate: [AuthGuard] to all page components except login

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => HomeModule,
    canLoad: [AuthGuard]
  },
  {
    path: 'cookies',
    component: CookiesPageComponent,
    data: {
      breadcrumb: 'Cookie-beleid'
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    // 404: redirect unkown paths to home
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
