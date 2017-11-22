import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationPageComponent } from './containers/registration-page.component';
import { RegistrationThankyouComponent } from './components/registration-thankyou.component';
import { RegistrationComponent } from './components/registration.component';

import { reducers } from '../auth/reducers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('auth', reducers),
    RegistrationRoutingModule
  ],
  exports: [],
  declarations: [
    RegistrationPageComponent,
    RegistrationThankyouComponent,
    RegistrationComponent
  ],
  providers: [],
})
export class RegistrationModule { }
