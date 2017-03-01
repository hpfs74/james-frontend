import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import routes here
import { OverviewComponent } from './pages/overview/overview.component';
import { CarComponent } from './pages/car/car.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: OverviewComponent,
    data: {
      breadcrumb: 'Overview'
    }
  },
  {
    path: 'profile',
    component: OverviewComponent //UserProfileComponent
  },
  {
    path: 'faq',
    component: OverviewComponent //FaqComponent
  },
  {
    path: 'about',
    component: OverviewComponent //AboutComponent
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
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
