import { Inject, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginForm } from './login.form';
import { Store } from '@ngrx/store';

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
  @Input() errorMessage: string;
  @Output() onPasswordReset: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  goToPasswordReset() {
    this.onPasswordReset.emit('passwordReset');
  }

  login(event: any) {
    this.onLogin.emit(event);
  }
}
