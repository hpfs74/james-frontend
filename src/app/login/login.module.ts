import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form.component';

import { reducers } from '../auth/reducers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('auth', reducers),
    LoginRoutingModule
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent
  ]
})
export class LoginModule { }
