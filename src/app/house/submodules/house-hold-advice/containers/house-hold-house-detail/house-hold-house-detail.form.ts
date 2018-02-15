import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { KNXFormGroupOptions } from '@knx/forms';

import { UIPair } from '@core/models/ui-pair';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';

export class HouseHoldHouseDetailForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`
  };

  constructor(private fb: FormBuilder,
              wallsTitle: Array<UIPair>,
              roofMaterial: Array<UIPair>,
              secondFloor: Array<UIPair>,
              security: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      wallsTitle: ['T', Validators.required],
      roofMaterial: ['P', Validators.required],
      secondFloor: ['G', Validators.required],
      security: ['G', Validators.required]
    });

    this.formConfig = {
      wallsTitle: {
        formControlName: 'wallsTitle',
        type: 'radio',
        formControl: this.formGroup.get('wallsTitle'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: wallsTitle
        }
      },
      roofMaterial: {
        formControlName: 'roofMaterial',
        type: 'radio',
        formControl: this.formGroup.get('roofMaterial'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: roofMaterial
        }
      },
      secondFloor: {
        formControlName: 'secondFloor',
        type: 'radio',
        formControl: this.formGroup.get('secondFloor'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: secondFloor
        }
      },
      security: {
        formControlName: 'security',
        type: 'radio',
        formControl: this.formGroup.get('security'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: security
        }
      }
    };
  }
}
