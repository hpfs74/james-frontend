import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import routes here
import { OverviewComponent } from './pages/overview/overview.component';
import { CarComponent } from './pages/car/car.component';

export const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  { path: 'car', component: CarComponent },
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
