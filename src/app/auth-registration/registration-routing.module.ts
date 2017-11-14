import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationPageComponent } from './containers/registration-page.component';

export const routes: Routes = [
  {
    path: '',
    component: RegistrationPageComponent
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegistrationRoutingModule { }
