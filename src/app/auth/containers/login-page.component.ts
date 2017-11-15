import { Inject, Component, OnInit, Output, EventEmitter, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromAuth from '../reducers';
import * as auth from '../actions/auth';
import { environment } from '../../../environments/environment';
import * as router from '../../core/actions/router';

import { LoginForm } from '../components/login.form';
import { loginError, CustomError } from '../models/login-error';
import * as profile from '../../profile/actions/profile';
import * as registration from '../actions/registration';
import * as FormUtils from '../../utils/base-form.utils';
import { scrollToY } from '../../utils/scroll-to-element.utils';

/**
 * Login page that's rendered in router-outlet of 'AppComponent if not logged in
 *
 * @export
 * @class LoginComponent
 */
@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store$.select(fromAuth.getLoginPagePending);
  error$ = this.store$.select(fromAuth.getLoginPageError);
  errorMessage: CustomError;

  form: LoginForm = new LoginForm(new FormBuilder());
  passwordResetUrl: string = this.getPasswordResetLink();
  registrationLink = environment.external.registration;
  resendSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailSuccess);

  constructor(@Inject(LOCALE_ID) private locale: string, private store$: Store<fromAuth.State>) {}

  ngOnInit() {
    scrollToY();
    this.store$.select(fromAuth.getLoginPageError)
    .filter(error => error !== null)
    .subscribe((error) => {
      this.errorMessage = { errorText: loginError[error] } || { errorText: loginError.default};
      if (error === 'profile inactive') {
        this.errorMessage = { errorText: loginError[error], hasLink: true };
      }
    });
    this.resetRegistrationStates();
  }
    /**
     * reset register states each time you get on login page,
     * to prevent undesired messages in the ui
     */
  resetRegistrationStates(): void {
    this.store$.dispatch( new registration.ResetState() );
    this.store$.dispatch( new registration.ResendResetState() );
  }

  resetLoginState(): void {
    this.store$.dispatch( new auth.LoginResetState() );
  }

  goToPasswordReset() {
    window.open(this.passwordResetUrl, '_blank');
  }

  getPasswordResetLink(): string {
    const locale = this.locale || 'nl-NL';
    const profileReset = environment.external.login;

    return environment.james.forgetPassword
      + `&redirect_uri=${encodeURI(profileReset)}`
      + `&locale=${locale}`;
  }

  goToRegister() {
    this.store$.dispatch(new router.Go({ path: ['/register'] }));
  }

  login(event) {
    event.preventDefault();
    this.resetRegistrationStates();
    this.resetLoginState();
    this.errorMessage = undefined;
    FormUtils.validateForm(this.form.formGroup);

    if (this.form.formGroup.valid) {
      const email = this.form.formGroup.get('email');
      const password = this.form.formGroup.get('password');
      this.store$.dispatch(new auth.Login({ username: email.value, password: password.value }));
    }
    return;
  }

  resendActivationMail(email: string) {
    this.store$.dispatch(new registration.ResendActivationEmail(email));
  }
}
