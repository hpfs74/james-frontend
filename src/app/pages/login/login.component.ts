import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../reducers';
import * as auth from '../../actions/auth';
import { environment } from '../../../environments/environment';

import { LoginForm } from './login.form';
import { AuthService } from './../../services';
import { loginError } from './login-error';
import * as profile from '../../actions/profile';
import * as fromRoot from '../../reducers';

/**
 * Login page that's rendered in router-outlet of 'AppComponent if not logged in
 *
 * @export
 * @class LoginComponent
 */
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);
  errorMessage: string;
  registrationLink: string;

  form: LoginForm = new LoginForm(new FormBuilder());
  passwordResetUrl: string = this.getPasswordResetLink();

  constructor(private store: Store<fromAuth.State>) {
    this.registrationLink = environment.external.registration;
  }

  ngOnInit() {
    this.store.select(fromAuth.getLoginPageError)
      .take(1)
      .subscribe((error) => {
        this.errorMessage = loginError[error] || null;
      });
  }

  goToPasswordReset() {
    window.location.href  = this.passwordResetUrl;
  }

  login(event) {
    event.preventDefault();

    Object.keys(this.form.formGroup.controls).forEach(key => {
      this.form.formGroup.get(key).markAsTouched();
    });

    if (this.form.formGroup.valid) {
      const email = this.form.formGroup.get('email');
      const password = this.form.formGroup.get('password');

      this.store.dispatch(new auth.Login({ username: email.value, password: password.value }));
    }
    return;
  }

  getPasswordResetLink(): string {
    return environment.james.forgetPassword + `&redirect_uri=${encodeURI(window.location.origin)}`;
  }

  goToRegister() {
    if (this.registrationLink) {
      window.location.href = this.registrationLink;
    }
  }
}
