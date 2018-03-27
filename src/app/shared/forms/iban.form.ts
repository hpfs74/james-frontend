import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from './base-form';
import { futureDateValidator, maxDateValidator, ibanValidator } from '../../utils/base-form.validators';
import { birthDateMask } from '../../utils/base-form.utils';
import { carReportingCodeValidator } from '../../utils/base-form.validators';
import { IBANMask } from '@app/utils/iban-tools';

export class IbanForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit is een verplicht veld',
    startDate: () => 'De ingevulde startdatum is niet geldig',
    startDateMax: () => 'Je kunt tot maximaal 60 dagen vooruit een datum kiezen',
    iban: () => 'Het ingevulde bankrekeningnummer (IBAN) is niet geldig'
  };

  constructor(private fb: FormBuilder) {
    super();

    // Startdate can be a maximum of 1 year in the future
    const maxMonths = 2;

    this.formGroup = this.fb.group({
      startDate: [null,
        Validators.compose([
          Validators.required,
          futureDateValidator('startDate'),
          maxDateValidator('startDateMax', maxMonths)
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
        help: true,
        formControl: this.formGroup.get('startDate'),
        validationErrors: this.validationErrors,
        inputOptions: {
          decode: true
        }
      },
      iban: {
        formControlName: 'iban',
        label: 'Bankrekening (IBAN)',
        help: true,
        description: 'De premie wordt maandelijks automatisch afgeschreven',
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
