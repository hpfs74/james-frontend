import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { numberWithCommas } from '@app/utils/base-form.utils';
import { carReportingCodeValidator } from '@app/utils/base-form.validators';
import { UIPair } from '@app/core/models/ui-pair';

import { futureDateValidator, maxDateValidator } from '@app/utils/base-form.validators';

export class CarReportingCodeForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  public validationErrors = {
    required: () => 'Dit is een verplicht veld',
    max: (data) => 'Waarde mag niet hoger zijn dan ' + numberWithCommas(data.max) + '€',
    reportingCode: () => 'Vul een geldige meldcode in (4 cijfers)',
    startDate: () => 'De ingevulde startdatum is niet geldig',
    startDateMax: () => 'Je kunt tot maximaal 60 dagen vooruit een datum kiezen',
  };

  constructor(private fb: FormBuilder, private securityClasses: Array<UIPair>) {
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
      reportingCode: [null,
        Validators.compose([
          Validators.required,
          carReportingCodeValidator('reportingCode')
        ])
      ],
      accessoryValue: [null,
        Validators.compose([
          Validators.required,
          Validators.max(100000)
        ])
      ],
      securityClass: ['unsure', Validators.required],
      saveToProfile: [{}]
    });

    this.formConfig = {
      startDate: {
        formControlName: 'startDate',
        label: 'Ingangsdatum verzekering',
        type: 'date',
        help: true,
        formControl: this.formGroup.get('startDate'),
        validationErrors: this.validationErrors,
        inputOptions: {
          decode: true
        }
      },
      reportingCode: {
        formControlName: 'reportingCode',
        formControl: this.formGroup.get('reportingCode'),
        validationErrors: this.validationErrors,
        label: 'Meldcode',
        help: true,
        inputOptions: {
          type: 'tel'
        }
      },
      accessoryValue: {
        formControlName: 'accessoryValue',
        label: 'Waarde accessoires',
        type: 'currency',
        help: true,
        formControl: this.formGroup.get('accessoryValue'),
        validationErrors: this.validationErrors,
        inputOptions: {
          prefix: 'knx-icon-eur'
        }
      },
      securityClass: {
        formControlName: 'securityClass',
        label: 'Hoe is je auto beveiligd?',
        type: 'select',
        formControl: this.formGroup.get('securityClass'),
        validationErrors: this.validationErrors,
        inputOptions: {
          items: securityClasses
        }
      },
      saveToProfile: {
        formControlName: 'saveToProfile',
        type: 'checkbox',
        formControl: this.formGroup.get('saveToProfile'),
        inputOptions: {
          items: [
            {
              label: 'Gegevens opslaan in mijn Knab Verzekeren profiel',
              value: 'true'
            } as UIPair
          ]
        }
      }
    };
  }
}
