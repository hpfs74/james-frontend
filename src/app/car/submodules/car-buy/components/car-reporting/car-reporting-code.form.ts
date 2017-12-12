
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm, KNXCustomFormGroupOptions } from '../../../../../shared/forms/base-form';
import { nameInitialMask } from '../../../../../utils/base-form.utils';
import { numberValidator } from '../../../../../utils/base-form.validators';
import { carReportingCodeValidator } from '../../../../../utils/base-form.validators';
import { UIPair } from '../../../../../core/models/ui-pair';

export class CarReportingCodeForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  public validationErrors = {
    required: () => 'Dit is een verplicht veld',
    reportingCode: () => 'Vul een geldige meldcode in (4 cijfers)'
  };

  constructor(private fb: FormBuilder, private securityClasses: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      reportingCode: [null,
        Validators.compose([
          Validators.required,
          carReportingCodeValidator('reportingCode')
        ])
      ],
      accessoryValue: [null,
        Validators.compose([
          Validators.required
        ])
      ],
      securityClass: ['unsure', Validators.required],
      saveToProfile: [{}]
    });

    this.formConfig = {
      reportingCode: {
        formControlName: 'reportingCode',
        formControl: this.formGroup.get('reportingCode'),
        validationErrors: this.validationErrors,
        label: 'Meldcode',
        help: true,
        inputOptions: {
          type: 'number'
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
