import { Observable } from 'rxjs/Observable';
import { Inject, Component, OnInit, Output, EventEmitter, LOCALE_ID, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { RegistrationForm } from '../components/registration.form';
import { registrationError } from '../models/registration-error';
import { Authenticate } from '../models/auth';

@Component({
  selector: 'knx-registration',
  styleUrls: ['./registration.component.scss'],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  errorMessage: string;
  form: RegistrationForm;

  @Output() onRegister: EventEmitter<Authenticate> = new EventEmitter();

  @Input() privacyStatementUrl: string;
  @Input() termsAndConditionsUrl: string;
  @Input() pending: boolean;
  @Input() set error(value: string) {
    this.errorMessage = registrationError[value] || registrationError.default;
  }

  ngOnInit() {
    this.form = new RegistrationForm(new FormBuilder());
  }

  register(event) {
    event.preventDefault();

    Object.keys(this.form.formGroup.controls).forEach(key => {
      this.form.formGroup.get(key).markAsTouched();
    });

    if (this.form.formGroup.valid) {
      const email = this.form.formGroup.get('email');
      const password = this.form.formGroup.get('password');
      this.onRegister.emit({ username: email.value, password: password.value});
    }
  }
}
