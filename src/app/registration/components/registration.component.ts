import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { RegistrationForm } from '../components/registration.form';
import { registrationError } from '../models/registration-error';
import { Authenticate } from '../../auth/models/auth';
import * as FormUtils from '../../utils/base-form.utils';

@Component({
  selector: 'knx-registration',
  styleUrls: ['./registration.component.scss'],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  errorMessage: string;
  form: RegistrationForm;

  @Input() privacyStatementUrl: string;
  @Input() termsAndConditionsUrl: string;
  @Input() selectedInsurance: any;
  @Input() pending: boolean;
  @Input() set error(value: string) {
    this.errorMessage = '';
    if (value) {
      this.errorMessage = registrationError[value] || registrationError.default;
    }
  }

  @Output() onRegister: EventEmitter<Authenticate> = new EventEmitter();
  @Output() onRegisterWithAdvice: EventEmitter<Authenticate> = new EventEmitter();

  ngOnInit() {
    this.form = new RegistrationForm(new FormBuilder());
  }

  register(event) {
    event.preventDefault();
    FormUtils.validateForm(this.form.formGroup);

    if (this.form.formGroup.valid) {
      const email = this.form.formGroup.get('email');
      const password = this.form.formGroup.get('password');

      if (this.selectedInsurance) {
        this.onRegisterWithAdvice.emit({ username: email.value, password: password.value});
      } else {
        this.onRegister.emit({ username: email.value, password: password.value});
      }
    }
  }

  registerAndShowErrors(event) {
    this.register(event);
    FormUtils.showFormErrors(this.form);
  }
}
