import { Component, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { KNXModalDialog, KNXModalDialogButton, KNXModalDialogOptions } from '@knx/modal';

import * as fromAuth from '../reducers';
import * as auth from '../actions/auth';

import { LoginForm } from './login.form';
import { AuthService } from '../services/auth.service';
import { loginError } from '../models/login-error';

@Component({
  selector: 'knx-login-modal',
  template: `
    <div class="knx-login-modal" [formGroup]="form.formGroup">
      <cx-form-group
      [formControlName]="form.formConfig.email.formControlName"
      [options]="form.formConfig.email"></cx-form-group>

      <div class="login-password-wrapper">
        <cx-form-group
          [formControlName]="form.formConfig.password.formControlName"
          [options]="form.formConfig.password">
        </cx-form-group>

        <button type="button"
          *ngIf="form.formGroup.get('password').value"
          class="knx-login__showpassword knx-icon-eye"
          [class.knx-icon-eye-slash]="form.showPassword"
          [class.knx-icon-eye]="!form.showPassword"
          (click)="form.toggleShowPassword($event)"></button>
      </div>
    </div>
  `
})
export class LoginModalComponent implements KNXModalDialog {
  form: LoginForm  = new LoginForm(new FormBuilder());
  actionButtons: KNXModalDialogButton[];
  showPassword = false;

  private loginFailError = 'No valid email or password';

  constructor(private store$: Store<fromAuth.State>) {
    this.actionButtons = [
      {
        text: 'Inloggen',
        onAction: this.login.bind(this)
      }
    ];
  }

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {
    // no processing needed
  }

  login(): Observable<boolean> {
    event.preventDefault();
    if (this.form.formGroup.valid) {
      const email = this.form.formGroup.get('email').value.trim();
      const password = this.form.formGroup.get('password').value.trim();

      this.store$.dispatch(new auth.Login({
        username: email,
        password: password
      }));
      return this.store$.select(fromAuth.selectAuthState)
        .flatMap(authenticated => {
          if (authenticated.status.loggedIn && authenticated.status.loginExpired) {
            return Observable.of(true);
          } else {
            Observable.throw(new Error(this.loginFailError));
          }
        });
    }
    return Observable.throw(new Error(this.loginFailError));
  }

  togglePassword(event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;

    this.form.formConfig.password.inputOptions.type =
      (this.form.formConfig.password.inputOptions.type === 'password')
        ? 'text' : 'password';
  }
}
