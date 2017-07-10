import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileSettingsComponent } from './profile-settings.component';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Mijn account'
    },
  },
  {
    path: 'settings',
    component: ProfileSettingsComponent,
    data: {
      title: 'Instellingen'
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
