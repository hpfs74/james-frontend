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

  constructor(private fb: FormBuilder, houseHold: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      wallsTitle: [null, Validators.required],
      roofMaterial: [null, Validators.required],
      secondFloor: [null, Validators.required],
      security: [null, Validators.required]
    });

    this.formConfig = {
      wallsTitle: {
        formControlName: 'wallsTitle',
        type: 'radio',
        formControl: this.formGroup.get('wallsTitle'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: [
            {
              label: 'Stone of concrete',
              value: '1'
            },
            {
              label: 'Houtenskeletbouw met buitenmuren van hout',
              value: '2'
            },
            {
              label: 'Houtenskeletbouw met buitenmuren van steen',
              value: '3'
            }
          ]
        }
      },
      roofMaterial: {
        formControlName: 'roofMaterial',
        type: 'radio',
        formControl: this.formGroup.get('roofMaterial'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: [
            {
              label: 'Bitumen',
              value: '90'
            },
            {
              label: 'Hout schalien',
              value: '140'
            },
            {
              label: 'Kunstriet',
              value: '190'
            },
            {
              label: 'Pannen',
              value: '300'
            },
            {
              label: 'Riet',
              value: '350'
            },
            {
              label: 'Shingles',
              value: '123'
            }
          ]
        }
      },
      secondFloor: {
        formControlName: 'secondFloor',
        type: 'radio',
        formControl: this.formGroup.get('secondFloor'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: [
            {
              label: 'I only have 1 floor',
              value: '2'
            },
            {
              label: 'Stone/Concrete',
              value: 'A'
            },
            {
              label: 'Wood',
              value: 'D'
            }
          ]
        }
      },
      security: {
        formControlName: 'security',
        type: 'radio',
        formControl: this.formGroup.get('security'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          items: [
            {
              label: 'No additional security',
              value: '2'
            },
            {
              label: 'BORG security label',
              value: 'A'
            },
            {
              label: 'Police OK security label',
              value: 'D'
            }
          ]
        }
      }
    };
  }
}
