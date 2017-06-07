import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../../models/base-form';
import { nameInitialMask } from '../../utils/base-form.utils';
import { carReportingCodeValidator } from '../../../utils/base-form.validators';

export class CarReportingCodeForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    reportingCode: () => 'Vul een geldige meldcode in (4 cijfers)'
  };

  constructor(private fb: FormBuilder) {
    super();

    const securityClasses = [
      {
        label: 'Weet ik niet',
        value: ''
      },
      {
        label: 'SCM klasse 1',
        value: 'SCM1'
      },
      {
        label: 'SCM klasse 2',
        value: 'SCM2'
      },
      {
        label: 'SCM klasse 3',
        value: 'SCM3'
      },
      {
        label: 'SCM klasse 5',
        value: 'SCM5'
      }
    ];

    this.formGroup = this.fb.group({
      reportingCode: [null,
        Validators.compose([
          Validators.required,
          carReportingCodeValidator('reportingCode')
        ])
      ],
      accessoryValue: [null,
        Validators.required
      ],
      securityClass: [{}],
      saveToProfile: [{}]
    });

    this.formConfig = {
      reportingCode: {
        formControlName: 'reportingCode',
        label: 'Meldcode',
        formControl: this.formGroup.get('reportingCode'),
        validationErrors: this.validationErrors
      },
      accessoryValue: {
        formControlName: 'accessoryValue',
        label: 'Waarde accessoires',
        formControl: this.formGroup.get('accessoryValue'),
        validationErrors: this.validationErrors
      },
      securityClass: {
        formControlName: 'securityClass',
        label: 'Hoe is je auto beveiligd?',
        formControl: this.formGroup.get('securityClass'),
        validationErrors: this.validationErrors,
        inputOptions: {
          items: securityClasses
        }
      }
    };
  }
}
