import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from './base-form';
import { futureDateValidator, maxDateValidator, ibanValidator } from '../../utils/base-form.validators';
import { birthDateMask } from '../../utils/base-form.utils';
import { carReportingCodeValidator } from '../../utils/base-form.validators';

export class IbanForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit is een verplicht veld',
    startDate: () => 'De ingevulde startdatum is niet geldig',
    iban: () => 'Het ingevulde bankrekeningnummer (IBAN) is niet geldig'
  };

  constructor(private fb: FormBuilder) {
    super();

    // Startdate can be a maximum of 1 year in the future
    const maxYear = 1;

    this.formGroup = this.fb.group({
      startDate: [null,
        Validators.compose([
          Validators.required,
          futureDateValidator('startDate'),
          maxDateValidator('startDate', maxYear)
        ])
      ],
      iban: [null,
        Validators.compose([
          Validators.required,
          ibanValidator('iban')
        ])
      ]
    });

    this.formConfig = {
      startDate: {
        formControlName: 'startDate',
        label: 'Ingangsdatum',
        type: 'date',
        formControl: this.formGroup.get('startDate'),
        validationErrors: this.validationErrors,
        inputOptions: {
          decode: true
        }
      },
      iban: {
        formControlName: 'iban',
        label: 'Bankrekening (IBAN)',
        description: 'De premie wordt maandelijks automatisch afgeschreven',
        formControl: this.formGroup.get('iban'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'text'
        }
      }
    };
  }
}
