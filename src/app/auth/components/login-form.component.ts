import { Inject, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginForm } from './login.form';
import { Store } from '@ngrx/store';
import { CustomError } from '../models/login-error';

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
  @Input() errorMessage: CustomError;
  @Output() onResendActivationMail: EventEmitter<string> = new EventEmitter<string>();
  @Output() onPasswordReset: EventEmitter<string> = new EventEmitter<string>();
  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

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
}
