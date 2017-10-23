import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from './../../shared/forms/base-form';

import { EmailValidator } from '../../utils/email-validator';

export class LoginForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  validationErrors = {
    required: () => 'Dit veld is verplicht',
    email: () => 'Vul een geldig e-mailadres in',
    password: () => 'Vul je wachtwoord in'
  };

  showPassword = false;

  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      email: [null, Validators.compose(
        [Validators.required, EmailValidator]
      )],
      password: [null, Validators.compose(
        [Validators.required]
      )],
    });

    this.formConfig = {
      email: {
        formControlName: 'email',
        formControl: this.formGroup.get('email'),
        validationErrors: this.validationErrors,
        label: 'Je email',
        placeholder: 'E-mailadres',
        inputOptions: {
          placeholder: 'E-mailadres',
          attributes: {
            'aria-label': 'Vul je e-mailadres in',
            'addonleft': true,
            'addonicon': 'knx-icon-envelope'
          }
        }
      },
      password: {
        formControlName: 'password',
        formControl: this.formGroup.get('password'),
        validationErrors: this.validationErrors,
        label: 'Wachtwoord',
        placeholder: 'Wachtwoord',
        inputOptions: {
          placeholder: 'Wachtwoord',
          type: 'password',
          attributes: {
            'aria-label': 'Vul je wachtwoord in',
            'addonleft': true,
            'addonicon': 'knx-icon-lock'
          }
        }
      }
    };
  }

  toggleShowPassword() {
    event.preventDefault();
    this.showPassword = !this.showPassword;

    this.formConfig.password.inputOptions.type =
      (this.formConfig.password.inputOptions.type === 'password')
        ? 'text' : 'password';
  }
}

