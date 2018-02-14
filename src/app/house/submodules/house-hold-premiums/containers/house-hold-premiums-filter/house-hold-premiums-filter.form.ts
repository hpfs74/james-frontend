import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UIPair } from '@core/models/ui-pair';
import { BaseForm } from '@app/shared/forms/base-form';

/**
 * describe the form filters
 */
export class HouseHoldPremiumsFilterForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  /**
   * default constructor
   *
   * @param {FormBuilder} fb - the form object to bind
   * @param {Array<UIPair>} coverages - the list of avilable coverage
   */
  constructor(private fb: FormBuilder,
              coverages?: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      mainCoverage: ['', Validators.required],
      outsideCoverage: [{}],
      glassCoverage: [{}]
    });

    this.formConfig = {
      mainCoverage: {
        formControlName: 'mainCoverage',
        type: 'radio',
        formControl: this.formGroup.get('coverage'),
        inputOptions: {
          items: coverages
        }
      },
      outsideCoverage: {
        formControlName: 'outsideCoverage',
        type: 'checkbox',
        formControl: this.formGroup.get('outsideCoverage'),
        inputOptions: {
          label: 'Outside coverage',
          value: 'J'
        } as UIPair
      },
      glassCoverage: {
        formControlName: 'glassCoverage',
        type: 'checkbox',
        formControl: this.formGroup.get('glassCoverage'),
        inputOptions: {
          label: 'Glass coverage',
          value: 'J'
        } as UIPair
      }
    };
  }
}
