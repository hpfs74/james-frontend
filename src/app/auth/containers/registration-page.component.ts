import { Observable } from 'rxjs/Observable';
import { Inject, Component, OnInit, Output, EventEmitter, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAuth from '../reducers';
import * as registration from '../actions/registration';
import { environment } from '../../../environments/environment';

import { LoginForm } from '../components/login.form';
import { loginError } from '../models/login-error';
import * as profile from '../../profile/actions/profile';

/**
 * Login page that's rendered in router-outlet of 'AppComponent if not logged in
 *
 * @export
 * @class LoginComponent
 */
@Component({
  templateUrl: './registration-page.component.html'
})
export class RegistrationPageComponent implements OnInit {
  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);
  errorMessage: string;

  form: LoginForm = new LoginForm(new FormBuilder());
  passwordResetUrl: string = this.getPasswordResetLink();
  registrationLink = environment.external.registration;

  constructor(@Inject(LOCALE_ID) private locale: string, private store: Store<fromAuth.State>) {}

  ngOnInit() {
    this.store.select(fromAuth.getLoginPageError)
      .filter(error => error !== null)
      .subscribe((error) => {
        this.errorMessage = loginError[error] || loginError.default;
      });
  }

  goToPasswordReset() {
    window.location.href  = this.passwordResetUrl;
  }

  getPasswordResetLink(): string {
    const locale = this.locale || 'nl-NL';
    const profileReset = environment.external.login;

    return environment.james.forgetPassword
      + `&redirect_uri=${encodeURI(profileReset)}`
      + `&locale=${locale}`;
  }

  register(event) {
    event.preventDefault();

    Object.keys(this.form.formGroup.controls).forEach(key => {
      this.form.formGroup.get(key).markAsTouched();
    });

    if (this.form.formGroup.valid) {
      const email = this.form.formGroup.get('email');
      const password = this.form.formGroup.get('password');

      this.store.dispatch(new registration.Register(email.value, password.value));
    }
    return;
  }
}
