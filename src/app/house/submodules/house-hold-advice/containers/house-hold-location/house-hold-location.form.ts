import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { KNXFormGroupOptions } from '@knx/forms';

import { UIPair } from '@core/models/ui-pair';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';

export class HouseHoldLocationForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`
  };

  constructor(private fb: FormBuilder, houseHold: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      houseHold: [true, Validators.required]
    });

    this.formConfig = {
      houseHold: {
        formControlName: 'houseHold',
        // label: 'Wat is je gezinssituatie?',
        type: 'radio',
        formControl: this.formGroup.get('houseHold'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          placeholder: '',
          items: [
            {
              label: 'Bought',
              value: true
            },
            {
              label: 'Rented',
              value: false
            }
          ]
        }
      }
    };
  }
}
