import { Inject, Component, OnInit, LOCALE_ID, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/filter';

import * as fromAuth from '../../auth/reducers';
import * as auth from '../../auth/actions/auth';
import * as registration from '../../auth/actions/registration';
import { environment } from '@env/environment';
import * as router from '../../core/actions/router';

import { LoginForm } from '../components/login.form';
import { loginError, CustomError } from '../models/login-error';

import * as FormUtils from '../../utils/base-form.utils';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  pending$ = this.store$.select(fromAuth.getLoginPagePending);
  error$ = this.store$.select(fromAuth.getLoginPageError);
  errorMessage: CustomError;

  form: LoginForm = new LoginForm(new FormBuilder());
  passwordResetUrl: string = this.getPasswordResetLink();
  resendSuccess$: Observable<boolean> = this.store$.select(fromAuth.getRegistrationResendActivationEmailSuccess);
  subscriptions$: Subscription[] = [];

  constructor(@Inject(LOCALE_ID) private locale: string, private store$: Store<fromAuth.State>) {
  }

  ngOnInit() {
    this.subscriptions$ = [
      this.store$.select(fromAuth.getLoginPageError)
        .filter(error => error !== null)
        .subscribe(value => this.handleLoginError(value))
    ];
    this.resetRegistrationStates();
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  /**
   * handle login page error message
   *
   * @param error - the error object
   */
  handleLoginError(error) {
    this.errorMessage = {errorText: loginError[error]} || {errorText: loginError.default};
    if (error === 'profile inactive') {
      this.errorMessage = {errorText: loginError.inactive_profile, hasLink: true};
    }
  }

  /**
   * reset register states each time you get on login page,
   * to prevent undesired messages in the ui
   */
  resetRegistrationStates(): void {
    this.store$.dispatch(new registration.ResetState());
    this.store$.dispatch(new registration.ResendResetState());
  }

  resetLoginState(): void {
    this.store$.dispatch(new auth.LoginResetState());
  }

  /* istanbul ignore next */
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
    this.store$.dispatch(new router.Go({path: ['/register']}));
  }

  /**
   * login the user if form is valid
   *
   * @param event - the event of the form
   */
  login(event) {
    event.preventDefault();
    this.resetRegistrationStates();
    this.resetLoginState();
    this.errorMessage = undefined;
    FormUtils.validateForm(this.form.formGroup);

    if (this.form.formGroup.valid) {
      const email = this.form.formGroup.get('email');
      const password = this.form.formGroup.get('password');
      this.store$.dispatch(new auth.Login({username: email.value, password: password.value}));
    }
    return;
  }

  resendActivationMail(email: string) {
    this.store$.dispatch(new registration.ResendActivationEmail(email));
  }
}
