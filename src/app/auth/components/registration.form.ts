import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from './../../shared/forms/base-form';
import { KNXInputOptions } from '../../components/knx-input/input.options';
import { EmailValidator } from '../../utils/email-validator';

export class RegistrationForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  validationErrors = {
    required: () => 'Dit veld is verplicht',
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
        placeholder: 'E-mailadres',
        label: 'Je email',
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
        placeholder: 'Wachtwoord',
        hideErrors: ['pattern', 'minlength'],
        label: 'Wachtwoord',
        type: 'password',
        attributes: {
          'aria-label': 'Vul je wachtwoord in',
          'addonleft': true,
          'addonicon': 'knx-icon-lock',
          'data-type': 'password'
        }
      },
      confirm: {
        formControlName: 'confirm',
        formControl: this.formGroup.get('confirm'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'checkbox',
          attributes: {
            'aria-label': 'Ik ga akkoord met de Gebruiksvoorwaarden and privacy statement van Knab'
          }
        }
      }
    };
  }
}
