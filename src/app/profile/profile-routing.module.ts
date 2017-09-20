import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './containers/profile.component';

export const profileRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Mijn account'
    },
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
