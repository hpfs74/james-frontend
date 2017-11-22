import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { BaseForm, KNXCustomFormGroupOptions } from './../../shared/forms/base-form';
import { EmailValidator } from '../../utils/email-validator';

export class RegistrationForm extends BaseForm {
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
      email: [null, Validators.compose(
        [
          Validators.required,
          EmailValidator
        ]
      )],
      password: [null, Validators.compose(
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        ]
      )],
      confirm: [null, Validators.compose(
        [
          Validators.requiredTrue
        ]
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
          showPasswordStrength: true,
          prefix: 'knx-icon-lock',
          attributes: {
            'aria-label': 'Vul je wachtwoord in',
            'password': true
          }
        }
      },
      confirm: {
        formControlName: 'confirm',
        formControl: this.formGroup.get('confirm'),
        validationErrors: this.validationErrors,
        type: 'custom', // need to use custom because transcluded ng-content does not go to (nested) child component
        showErrorMessages: false,
        inputOptions: {
          attributes: {
            'aria-label': 'Ik ga akkoord met de gebruiksvoorwaarden en het privacybeleid van Knab.'
          }
        }
      }
    };
  }
}
