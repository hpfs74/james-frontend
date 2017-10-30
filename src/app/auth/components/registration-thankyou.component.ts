import { Observable } from 'rxjs/Observable';
import { Inject, Component, OnInit, Output, EventEmitter, LOCALE_ID, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';


import * as registration from '../actions/registration';
import { environment } from '../../../environments/environment';

import { RegistrationForm } from '../components/registration.form';
import { registrationError } from '../models/registration-error';
import * as profile from '../../profile/actions/profile';

@Component({
  selector: 'knx-registration-thankyou',
  templateUrl: './registration-thankyou.component.html',
  styleUrls: ['./registration-thankyou.component.scss']
})
export class RegistrationThankyouComponent {
  message: string;
  errorMessage: string;

  @Output() onLogin: EventEmitter<any> = new EventEmitter();
  @Output() onSendActivation: EventEmitter<string> = new EventEmitter();

  @Input() email: string;
  @Input() resendPending: boolean;
  @Input() resendSuccess: boolean;
  @Input() resendError: string;
  @Input() set error(value: string) {
    this.errorMessage = registrationError[value] || registrationError.default;
  }

  login() {
    this.onLogin.emit();
  }

  resendActivationEmail() {
    this.onSendActivation.emit(this.email);
  }
}
