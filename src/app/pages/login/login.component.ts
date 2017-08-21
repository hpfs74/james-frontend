import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../reducers';
import * as auth from '../../actions/auth';
import { AuthToken } from '../../models/auth';

import { environment } from '../../../environments/environment';
import { LoginForm } from './login.form';
import { AuthService, TOKEN_NAME, TOKEN_OBJECT_NAME } from './../../services';
import { loginError } from './login-error';

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
  isPending = false;
  showPassword = false;

  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);

  form: LoginForm;
  messageTitle: string;
  message: string;
  passwordResetUrl: string;

  constructor(private router: Router, private store: Store<fromAuth.State>) {
    this.form = new LoginForm(new FormBuilder());
    // this.passwordResetUrl = authService.getPasswordResetLink();
  }

  ngOnInit() {
    this.store.select(fromAuth.getAuthState)
      .subscribe((state) => {
        if (state.token) {
          this.isPending = false;
          localStorage.setItem(TOKEN_NAME, state.token.access_token);
          localStorage.setItem(TOKEN_OBJECT_NAME, JSON.stringify(state.token));
        }
      });

    // this.store.select(fromAuth.getLoginPageError)
    //   .subscribe((error) => console.log(error));
  }

  goToPasswordReset() {
    window.location.href  = this.passwordResetUrl;
  }

  togglePassword(event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;

    this.form.formConfig.password.inputOptions.type =
      (this.form.formConfig.password.inputOptions.type === 'password')
        ? 'text' : 'password';
  }

  login(event) {
    event.preventDefault();

    Object.keys(this.form.formGroup.controls).forEach(key => {
      this.form.formGroup.get(key).markAsTouched();
    });

    if (this.form.formGroup.valid) {
      this.message = undefined;

      const email = this.form.formGroup.get('email');
      const password = this.form.formGroup.get('password');

      // this.authService
      //   .login(email.value, password.value)
      //   .subscribe((token) => {

      //     localStorage.setItem(TOKEN_NAME, token.access_token);
      //     localStorage.setItem(TOKEN_OBJECT_NAME, JSON.stringify(token));

      //     // Get the redirect URL from our auth service
      //     // If no redirect has been set, use the default
      //     const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/overview';

      //     // Set our navigation extras object
      //     // that passes on our global query params and fragment
      //     const navigationExtras: NavigationExtras = {
      //       queryParamsHandling: 'merge',
      //       preserveFragment: true
      //     };

      //     // Redirect the user
      //     this.router.navigate([redirect], navigationExtras);
      //   }, (res) => this.handleError(res.json()));

      this.store.dispatch(new auth.Login({ username: email.value, password: password.value }));
    }
    return;
  }

  hasErrors() {
    return this.message && this.form.formGroup.valid;
  }

  handleError(data) {
    this.message = loginError[data.error] || loginError.default;

    if (data.error_description && !this.message) {
      this.message += `\n${data.error_description}`;
    }
  }
}
