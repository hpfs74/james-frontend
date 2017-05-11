import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      breadcrumb: 'Mijn account'
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }
