import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { KNXFormGroupOptions } from '@knx/forms';

import { UIPair } from '@core/models/ui-pair';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';

export class HouseHoldHouseTypeForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`
  };

  constructor(private fb: FormBuilder, roomsCount: Array<UIPair>,
              surfaceArea: Array<UIPair>,
              buildingType: Array<UIPair>,
              buildYear: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      roomsCount: ['2', Validators.required],
      surfaceArea: ['90', Validators.required],
      buildingType: ['2', Validators.required],
      buildYear: ['1800', Validators.required]
    });

    this.formConfig = {
      roomsCount: {
        formControlName: 'roomsCount',
        type: 'radio',
        formControl: this.formGroup.get('roomsCount'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: [],
          placeholder: '',
          items: roomsCount
        }
      },
      surfaceArea: {
        formControlName: 'surfaceArea',
        type: 'radio',
        formControl: this.formGroup.get('surfaceArea'),
        validationErrors: this.validationErrors,
        inputOptions: {
          // formGroupModifiers: ['knx-form-group__wrap--spread'],
          placeholder: '',
          items: surfaceArea
        }
      },
      buildingType: {
        formControlName: 'buildingType',
        type: 'radio',
        formControl: this.formGroup.get('buildingType'),
        validationErrors: this.validationErrors,
        inputOptions: {
          optTwoCols: true,
          placeholder: '',
          items: buildingType
        }
      },
      buildYear: {
        formControlName: 'buildYear',
        type: 'radio',
        formControl: this.formGroup.get('buildYear'),
        validationErrors: this.validationErrors,
        inputOptions: {
          // formGroupModifiers: ['knx-form-group__wrap--spread'],
          placeholder: '',
          items: buildYear
        }
      },


    };
  }
}
