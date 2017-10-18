import { Observable } from 'rxjs/Observable';
import { Inject, Component, OnInit, Output, EventEmitter, LOCALE_ID, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAuth from '../reducers';
import * as registration from '../actions/registration';
import { environment } from '../../../environments/environment';

import { RegistrationForm } from '../components/registration.form';
import { registrationError } from '../models/registration-error';
import * as profile from '../../profile/actions/profile';

/**
 * Registrazione component
 *
 * @export
 * @class RegistrationComponent
 */
@Component({
  selector: 'knx-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  @Input() privacyStatementUrl: string;
  @Input() termsAndConditionsUrl: string;

  pending$ = this.store.select(fromAuth.getRegistrationPending);
  error$ = this.store.select(fromAuth.getRegistrationError);

  errorMessage: string;

  form: RegistrationForm = new RegistrationForm(new FormBuilder());


  constructor(@Inject(LOCALE_ID) private locale: string, private store: Store<fromAuth.State>) {
  }

  ngOnInit() {
    this.store.select(fromAuth.getRegistrationError)
      .filter(error => error !== null)
      .subscribe((error) => {
        this.errorMessage = registrationError[error] || registrationError.default;
      });
  }

  register(event) {
    event.preventDefault();

    Object.keys(this.form.formGroup.controls).forEach(key => {
      this.form.formGroup.get(key).markAsTouched();
    });

    if (this.form.formGroup.valid) {
      const email = this.form.formGroup.get('email');
      const password = this.form.formGroup.get('password');

      this.store.dispatch(new registration.Register({ emailaddress: email.value, password: password.value}));
    }
    return;
  }
}
