import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../../models/base-form';
import { nameInitialMask } from '../../utils/base-form.utils';
import { numberValidator } from '../../../utils/base-form.validators';
import { carReportingCodeValidator } from '../../../utils/base-form.validators';

export class CarCheckForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  checkAnswers: Array<any>;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    reportingCode: () => 'Vul een geldige meldcode in (4 cijfers)'
  };

  constructor( private fb: FormBuilder, private checkAnswersContent ) {
    super();

    this.checkAnswers = checkAnswersContent;

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
      securityClass: [null]
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
        type: 'radio',
        formControl: this.formGroup.get('accessoryValue'),
        validationErrors: this.validationErrors
      },
      securityClass: {
        formControlName: 'securityClass',
        label: 'Hoe is je auto beveiligd?',
        type: 'select',
        formControl: this.formGroup.get('securityClass'),
        inputOptions: {
          items: this.checkAnswers
        }
      }
    };
  }
}
