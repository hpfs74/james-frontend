import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { KNXModalDialog, KNXModalDialogButton, KNXModalDialogOptions } from '@knx/modal';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import * as fromAuth from '../../auth/reducers';
import * as auth from '../../auth/actions/auth';
import * as FormUtils from '../../utils/base-form.utils';

import { LoginForm } from './login.form';
import { CustomError } from '../models/login-error';
import { loginError } from '../models/login-error';

@Component({
  selector: 'knx-login-modal',
  styleUrls: ['./login-modal.component.scss'],
  template: `
    <div class="knx-login-modal" [formGroup]="form.formGroup">
      <div class="login-password-wrapper">
        <knx-form-group
          [formControlName]="form.formConfig.email.formControlName"
          [options]="form.formConfig.email">
        </knx-form-group>
      </div>

      <div class="login-password-wrapper">
        <knx-form-group
          [formControlName]="form.formConfig.password.formControlName"
          [options]="form.formConfig.password">
        </knx-form-group>
      </div>

      <div class="knx-login__error" *ngIf="form.formGroup.valid && errorMessage">
        <p *ngIf="errorMessage.errorText">{{ errorMessage.errorText }}</p>
        <p *ngIf="!errorMessage.errorText">Het inloggen is helaas niet gelukt, probeer het alsjeblieft opnieuw.</p>
      </div>
    </div>
  `
})
export class LoginModalComponent implements KNXModalDialog, OnInit {
  errorMessage: CustomError;
  form: LoginForm  = new LoginForm(new FormBuilder());
  actionButtons: KNXModalDialogButton[];
  showPassword = false;

  private loginFailError = 'No valid email or password';

  constructor(private store$: Store<fromAuth.State>) {
    this.actionButtons = [
      {
        text: 'Inloggen',
        buttonClass: 'knx-button knx-button--fullwidth knx-button--primary',
        onAction: this.login.bind(this)
      }
    ];
  }

  ngOnInit() {
    this.store$.select(fromAuth.getLoginPageError)
      .filter(error => error !== null)
      .subscribe((error) => {
        this.errorMessage = { errorText: loginError[error] } || { errorText: loginError.default};

        if (error === 'invalid_username') {
          this.errorMessage = { errorText: loginError[error], hasLink: true };
        }
      });
  }

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {}

  login(): Observable<boolean> {
    event.preventDefault();
    FormUtils.showFormErrors(this.form);

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
}
