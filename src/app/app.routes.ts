import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard.service';
import { LoginComponent } from './pages/login/login.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PageNotFoundComponent } from './pages/error/pagenotfound.component';
import { CookiesPageComponent } from './pages/cookies/cookies-page.component';

//TODO: add canActivate: [AuthGuard] to pages

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
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
    path: 'overview',
    component: OverviewComponent,
    data: {
      breadcrumb: 'Overzicht'
    }
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
  {
    path: '**',
    component: PageNotFoundComponent
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
