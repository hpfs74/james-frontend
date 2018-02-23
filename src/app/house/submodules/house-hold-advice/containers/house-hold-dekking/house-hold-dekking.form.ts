import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UIPair } from '@core/models/ui-pair';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { birthDateValidator, futureDateValidator } from '@utils/base-form.validators';

export class HouseHoldDekkingForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`,
    dateOfBirth: () => 'Error on date of birth',
    commencingDate: () => 'Date must be in the future',
    coverage: () => 'No coverage selected'
  };

  constructor(private fb: FormBuilder,
              netIncomeRange: Array<UIPair>,
              familySituation: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      coverage: [null, Validators.required],
      outsideCoverage: ['N'],
      netIncomeRange: [null, Validators.required],
      dateOfBirth: [null,
        [
          Validators.required,
          birthDateValidator('dateOfBirth')
        ]
      ],
      familySituation: [null, Validators.required],
      commencingDate: [null, [Validators.required, futureDateValidator('commencingDate', 90)]]
    });

    this.formConfig = {
      coverage: {
        formControlName: 'coverage',
        type: 'text',
        formControl: this.formGroup.get('coverage')
      },

      outsideCoverage: {
        formControlName: 'outsideCoverage',
        type: 'checkbox',
        formControl: this.formGroup.get('outsideCoverage'),
        inputOptions: {
          label: 'Yes. I want outside coverage',
          value: 'J'
        } as UIPair
      },
      netIncomeRange: {
        formControlName: 'netIncomeRange',
        type: 'radio',
        formControl: this.formGroup.get('netIncomeRange'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: netIncomeRange
        }
      },
      dateOfBirth: {
        formControlName: 'dateOfBirth',
        type: 'date',
        formControl: this.formGroup.get('dateOfBirth'),
        inputOptions: {
          decode: true,
          type: 'tel'
        }
      },
      familySituation: {
        formControlName: 'familySituation',
        type: 'radio',
        formControl: this.formGroup.get('familySituation'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Maak een keuze',
          events: ['focus'],
          items: familySituation
        }
      },
      commencingDate: {
        formControlName: 'commencingDate',
        type: 'date',
        formControl: this.formGroup.get('commencingDate'),
        inputOptions: {
          decode: true,
          type: 'tel'
        }
      }
    };
  }
}
