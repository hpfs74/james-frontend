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
      wallsTitle: ['T', Validators.required],
      roofMaterial: ['P', Validators.required],
      secondFloor: ['G', Validators.required],
      security: ['N', Validators.required]
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
              value: 'T'
            },
            {
              label: 'Houtenskeletbouw met buitenmuren van hout',
              value: 'K'
            },
            {
              label: 'Houtenskeletbouw met buitenmuren van steen',
              value: 'L'
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
              value: 'N'
            },
            {
              label: 'Hout (schaliën)',
              value: 'C'
            },
            {
              label: 'Kunstriet',
              value: 'K'
            },
            {
              label: 'Pannen',
              value: 'P'
            },
            {
              label: 'Riet',
              value: 'R'
            },
            {
              label: 'Shingles',
              value: 'Q'
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
              value: 'G'
            },
            {
              label: 'Stone/Concrete',
              value: 'S'
            },
            {
              label: 'Wood',
              value: 'T'
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
              value: 'N'
            },
            {
              label: 'BORG security label',
              value: 'B',
              disabled: true
            },
            {
              label: 'Police OK security label',
              value: 'V'
            }
          ]
        }
      }
    };
  }
}
