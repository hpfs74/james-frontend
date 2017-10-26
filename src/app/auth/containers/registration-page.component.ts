import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CXEmailValidator } from '@cx/form';
import { Observable } from 'rxjs/Rx';

import * as fromAuth from '../reducers';
import * as auth from '../actions/auth';
import * as registration from '../actions/registration';
import { Authenticate } from '../models/auth';

@Component({
  selector: 'knx-password-reset',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  registrationError$: Observable<string> = this.store$.select(fromAuth.getRegistrationError).filter(error => error !== null);
  registrationPending$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationPending);
  registrationSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationSuccess);
  activationError$: Observable<string> = this.store$.select(fromAuth.getRegistrationResendActivationEmailError);
  activationPending$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailPending);
  registrationEmail$: Observable<string> = this.store$.select(fromAuth.getRegistrationEmail);
  constructor(private store$: Store<fromAuth.State>) {}

  register(register: Authenticate) {
    this.store$.dispatch(new registration.Register({ emailaddress: register.username, password: register.password }));
  }

  redirectToLogin() {
    this.store$.dispatch(new auth.LoginRedirect());
  }

  sendActivationEmail(email: string) {
    this.store$.dispatch(new registration.RegisterResendActivationEmail(email));
  }
}
