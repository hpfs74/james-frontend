import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from './../../shared/forms/base-form';

import { EmailValidator } from '../../utils/email-validator';

export class LoginForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    email: () => 'Het ingevulde e-mailadres is niet geldig'
  };

  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = this.fb.group({
      email: [null, Validators.compose(
        [Validators.required, EmailValidator]
      )],
      password: [null, Validators.compose(
        [Validators.required]
      )]
    });

    this.formConfig = {
      email: {
        formControlName: 'email',
        formControl: this.formGroup.get('email'),
        validationErrors: this.validationErrors,
        label: 'Je e-mailadres',
        placeholder: 'E-mailadres',
        showErrorMessages: false,
        type: 'text',
        attributes: {
          'aria-label': 'Vul je e-mailadres in',
          'addonleft': true,
          'addonicon': 'knx-icon-envelope'
        }
      },
      password: {
        formControlName: 'password',
        formControl: this.formGroup.get('password'),
        validationErrors: this.validationErrors,
        label: 'Wachtwoord',
        placeholder: 'Wachtwoord',
        showErrorMessages: false,
        type: 'password',
        attributes: {
          'aria-label': 'Vul je wachtwoord in',
          'addonleft': true,
          'addonicon': 'knx-icon-lock',
          'password': true
        }
      }
    };
  }
}
