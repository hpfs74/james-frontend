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
  templateUrl: './registration-page.component.html'
})
export class RegistrationPageComponent {
  registrationError$: Observable<string> = this.store$.select(fromAuth.getRegistrationError).filter(error => error !== null);
  registrationPending$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationPending);
  registrationSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationSuccess);
  resendError$: Observable<string> = this.store$.select(fromAuth.getRegistrationResendActivationEmailError);
  resendPending$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailPending);
  resendSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailSuccess);
  registrationEmail$: Observable<string> = this.store$.select(fromAuth.getRegistrationEmail);

  constructor(private store$: Store<fromAuth.State>) {
    this.store$.dispatch( new registration.RegisterResetState() );
    this.store$.dispatch( new registration.RegisterResendResetState() );
  }

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
