import { Observable } from 'rxjs/Observable';
import { Inject, Component, OnInit, Output, EventEmitter, LOCALE_ID, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAuth from '../reducers';
import * as auth from '../actions/auth';
import * as registration from '../actions/registration';
import { environment } from '../../../environments/environment';

import { RegistrationForm } from '../components/registration.form';
import { registrationError } from '../models/registration-error';
import * as profile from '../../profile/actions/profile';

/**
 * Registrazione component
 *
 * @export
 * @class RegistrationComponent
 */
@Component({
  selector: 'knx-registration-thankyou',
  templateUrl: './registration-thankyou.component.html'
})
export class RegistrationThankyouComponent implements OnInit {
  @Input() email: string;

  pending$ = this.store$.select(fromAuth.getRegistrationResendActivationEmailPending);
  error$ = this.store$.select(fromAuth.getRegistrationResendActivationEmailError);

  message: string;
  errorMessage: string;

  constructor(private store$: Store<fromAuth.State>) {
  }

  ngOnInit() {
    this.store$.select(fromAuth.getRegistrationError)
      .filter(error => error !== null)
      .subscribe((error) => {
        this.errorMessage = registrationError[error] || registrationError.default;
      });
  }

  login() {
    this.store$.dispatch(new auth.LoginRedirect());
  }

  resendActivationEmail() {
    this.store$.dispatch(new registration.RegisterResendActivationEmail(this.email));
    return;
  }
}
