import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileEditComponent } from './containers/edit/edit.component';
import { ProfileEditPasswordComponent } from './containers/edit-password/edit-password.component';
import { ProfileOverviewComponent } from './containers/overview/overview.component';
import { AuthGuard } from '@app/auth/services';

export const profileRoutes: Routes = [
  {
    path: 'profile-edit',
    canActivate: [AuthGuard],
    component: ProfileEditComponent,
    data: {
      title: 'Mijn account'
    }
  },
  {
    path: 'profile-overview',
    canActivate: [AuthGuard],
    component: ProfileOverviewComponent,
    data: {
      title: 'Mijn account'
    }
  },
  {
    path: 'profile-edit-password',
    canActivate: [AuthGuard],
    component: ProfileEditPasswordComponent,
    data: {
      title: 'Mijn account'
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
