import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from './base-form';
import { ibanValidator } from '@app/utils/base-form.validators';
import { IBANMask } from '@app/utils/iban-tools';

export class IbanForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit is een verplicht veld',
    iban: () => 'Het ingevulde bankrekeningnummer (IBAN) is niet geldig'
  };

  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      iban: [null,
        Validators.compose([
          Validators.required,
          ibanValidator('iban')
        ])
      ]
    });

    this.formConfig = {
      iban: {
        formControlName: 'iban',
        label: 'Bankrekening (IBAN)',
        help: true,
        formControl: this.formGroup.get('iban'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'text',
          textMask: IBANMask
        }
      }
    };
  }
}
