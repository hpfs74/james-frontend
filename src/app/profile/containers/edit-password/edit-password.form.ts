import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { EmailValidator } from '@app/utils/email-validator';

export class PasswordForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };
  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    email: () => 'Vul een geldig e-mailadres in alsjeblieft',
    pattern: () => 'Ga je akkoord met de gebruiksvoorwaarden en het privacy statement?'
  };

  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      password: [null, Validators.compose(
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        ]
      )],
      confirmPassword: [null, Validators.compose(
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        ]
      )],
      newPassword: [null, Validators.compose(
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        ]
      )],
    });

    this.formConfig = {
      password: {
        formControlName: 'password',
        formControl: this.formGroup.get('password'),
        validationErrors: this.validationErrors,
        label: 'current password',
        type: 'password',
        showErrorMessages: false,
        inputOptions: {
          type: 'password',
          placeholder: 'Wachtwoord',
          hideErrors: ['pattern', 'minlength'],
          showPasswordStrength: true,
          prefix: 'knx-icon-lock',
          attributes: {
            'aria-label': 'Vul je wachtwoord in',
            'password': true
          }
        }
      },
      confirmPassword: {
        formControlName: 'confirmPassword',
        formControl: this.formGroup.get('confirmPassword'),
        validationErrors: this.validationErrors,
        label: 'confirm password',
        type: 'password',
        showErrorMessages: false,
        inputOptions: {
          type: 'password',
          placeholder: 'Wachtwoord',
          hideErrors: ['pattern', 'minlength'],
          showPasswordStrength: true,
          prefix: 'knx-icon-lock',
          attributes: {
            'aria-label': 'Vul je wachtwoord in',
            'password': true
          }
        }
      },
      newPassword: {
        formControlName: 'newPassword',
        formControl: this.formGroup.get('newPassword'),
        validationErrors: this.validationErrors,
        label: 'new  password',
        type: 'password',
        showErrorMessages: false,
        inputOptions: {
          type: 'password',
          placeholder: 'Wachtwoord',
          hideErrors: ['pattern', 'minlength'],
          showPasswordStrength: true,
          prefix: 'knx-icon-lock',
          attributes: {
            'aria-label': 'Vul je wachtwoord in',
            'password': true
          }
        }
      }
    };
  }
}
