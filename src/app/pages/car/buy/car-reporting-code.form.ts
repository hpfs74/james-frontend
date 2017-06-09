import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../../models/base-form';
import { nameInitialMask } from '../../utils/base-form.utils';
import { numberValidator } from '../../../utils/base-form.validators';
import { carReportingCodeValidator } from '../../../utils/base-form.validators';
import { carSecurityClasses } from '../../../models/car-security-class';

export class CarReportingCodeForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;
  securityClasses = carSecurityClasses;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    reportingCode: () => 'Vul een geldige meldcode in (4 cijfers)'
  };

  constructor(private fb: FormBuilder) {
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
      securityClass: [null],
      saveToProfile: [{}]
    });

    this.formConfig = {
      reportingCode: {
        formControlName: 'reportingCode',
        label: 'Meldcode',
        formControl: this.formGroup.get('reportingCode'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'text'
        }
      },
      accessoryValue: {
        formControlName: 'accessoryValue',
        label: 'Waarde accessoires',
        type: 'currency',
        formControl: this.formGroup.get('accessoryValue'),
        validationErrors: this.validationErrors
      },
      securityClass: {
        formControlName: 'securityClass',
        label: 'Hoe is je auto beveiligd?',
        type: 'select',
        formControl: this.formGroup.get('securityClass'),
        validationErrors: this.validationErrors,
        inputOptions: {
          items: this.securityClasses
            .map((i) => {
              return {
                label: i.short ? `${i.title} - ${i.short}` : i.title,
                value: i.value
              };
            })
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
            }
          ]
        }
      }
    };
  }
}
