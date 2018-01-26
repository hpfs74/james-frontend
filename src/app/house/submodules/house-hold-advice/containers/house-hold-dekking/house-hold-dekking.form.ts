import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UIPair } from '@core/models/ui-pair';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { birthDateValidator } from '@utils/base-form.validators';

export class HouseHoldDekkingForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`,
    // dateOfBirth: () => 'Error on date of birth'
  };

  constructor(private fb: FormBuilder, houseHold: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      coverage: [null],
      outsideCoverage: [null],
      netIncomeRange: [null, Validators.required],
      dateOfBirth: [null ], // , Validators.required, birthDateValidator('dateOfBirth')],
      familySituation: [null, Validators.required]
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
          items: [
            {
              label: 'Tot en met € 1.000',
              value: '1000'
            },
            {
              label: '€ 1.001 tot en met € 2.000',
              value: '2000'
            },
            {
              label: '€ 2.001 tot en met € 3.000',
              value: '3000'
            },
            {
              label: '€ 3.001 tot en met € 4.850',
              value: '4850'
            }
          ]
        }
      },
      dateOfBirth: {
        formControlName: 'dateOfBirth',
        label: 'Date of birth',
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
          items: houseHold
        }
      }
    };
  }
}
