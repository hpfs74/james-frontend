import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileEditComponent } from './containers/edit/edit.component';
import { ProfileOverviewComponent } from './containers/overview/overview.component';

export const profileRoutes: Routes = [
  {
    path: 'profile-edit',
    component: ProfileEditComponent,
    data: {
      title: 'Mijn account'
    },
  },
  {
    path: 'profile-overview',
    component: ProfileOverviewComponent,
    data: {
      title: 'Mijn account'
    },
  },
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
