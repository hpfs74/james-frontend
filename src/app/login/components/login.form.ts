import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { BaseForm, KNXCustomFormGroupOptions } from './../../shared/forms/base-form';
import { EmailValidator } from '../../utils/email-validator';

export class LoginForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

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
        showErrorMessages: false,
        label: 'Je e-mailadres',
        inputOptions: {
          type: 'email',
          placeholder: 'E-mailadres',
          prefix: 'knx-icon-envelope',
          attributes: {
            'aria-label': 'Vul je e-mailadres in'
          }
        }
      },
      password: {
        formControlName: 'password',
        formControl: this.formGroup.get('password'),
        validationErrors: this.validationErrors,
        label: 'Wachtwoord',
        type: 'password',
        showErrorMessages: false,
        inputOptions: {
          type: 'password',
          placeholder: 'Wachtwoord',
          hideErrors: ['pattern', 'minlength'],
          prefix: 'knx-icon-lock',
          attributes: {
            'password': true,
            'aria-label': 'Vul je wachtwoord in'
          }
        }
      }
    };
  }
}
