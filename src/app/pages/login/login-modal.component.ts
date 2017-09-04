import { Component, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { KNXModalDialog, KNXModalDialogButton, KNXModalDialogOptions } from '@knx/modal';

import * as fromAuth from '../../reducers';
import * as auth from '../../actions/auth';

import { LoginForm } from './login.form';
import { AuthService } from './../../services';
import { loginError } from './login-error';

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

  constructor(private store$: Store<fromAuth.State>) {
    this.actionButtons = [
      {
        text: 'Inloggen', onAction: () => {
          // this.store$.dispatch(new layout.closeModal('loginModal'));
          return true;
        }
      }
    ];
  }

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {
    // no processing needed
  }

  togglePassword(event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;

    this.form.formConfig.password.inputOptions.type =
      (this.form.formConfig.password.inputOptions.type === 'password')
        ? 'text' : 'password';
  }
}
