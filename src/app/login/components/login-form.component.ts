import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginForm } from './login.form';
import { ContentConfig } from '../../content.config';
import { CustomError } from '../models/login-error';
import * as FormUtils from '../../utils/base-form.utils';

/**
 * @export
 * @class LoginFormComponent
 */
@Component({
  selector: 'knx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Input() form: LoginForm;
  @Input() pending: Store<boolean>;
  @Input() resendSuccess: Store<boolean>;
  @Input() errorMessage: CustomError;

  @Output() onResendActivationMail: EventEmitter<string> = new EventEmitter<string>();
  @Output() onPasswordReset: EventEmitter<string> = new EventEmitter<string>();
  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();

  emailContent: any;

  constructor(private contentConfig: ContentConfig) {
    this.emailContent = contentConfig.getKey('email');
  }

  resendActivationMail() {
    let notActivatedEmail = this.form.formGroup.get('email').value;
    this.onResendActivationMail.emit(notActivatedEmail);
  }

  goToPasswordReset() {
    this.onPasswordReset.emit('passwordReset');
  }

  login(event: any) {
    this.onLogin.emit(event);
  }

  loginAndShowErrors(event) {
    this.login(event);
    FormUtils.showFormErrors(this.form);
  }
}
