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

  constructor(private fb: FormBuilder, houseHold: Array<UIPair>) {
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
          items: [
            {
              label: '2 or less rooms',
              value: '2'
            },
            {
              label: '3 rooms',
              value: '3'
            },
            {
              label: '4 rooms',
              value: '4'
            },
            {
              label: '5 rooms',
              value: '5'
            },
            {
              label: '6 rooms',
              value: '6'
            },
            {
              label: '7 rooms',
              value: '7'
            },
            {
              label: '8 rooms',
              value: '8'
            },
            {
              label: '9 or more rooms',
              value: '9'
            },
          ]
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
          items: [
            {
              label: 'Tot en met 90 m2',
              value: '90'
            },
            {
              label: '91 m2 t/m 140 m2',
              value: '140'
            },
            {
              label: '141 m2 t/m 190 m2',
              value: '190'
            },
            {
              label: '191 m2 t/m 300 m2',
              value: '300'
            },
            {
              label: '300 m2 or more',
              value: '350',
              disabled: true
            }
          ]
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
          items: [
            {
              label: 'Vrijstaande woning',
              value: '2'
            },
            {
              label: 'Appartement / Flat', value: 'A'
            },
            {
              label: 'Grachtenwoning', value: 'D'
            },
            {
              label: 'Hoekwoning', value: 'H'
            },
            {
              label: 'Kamer in bejaardentehuis',
              value: 'M'
            },
            {
              label: 'Kamer in studentenhuis, verpleeg(st)erhuis',
              value: 'O'
            },
            {
              label: 'Kamer in verzorgingshuis, verpleeghuis',
              value: 'P'
            },
            {
              label: 'Twee onder één kap',
              value: 'T'
            },
            {
              label: 'Tussenwoning',
              value: 'U'
            },
            {
              label: 'Woonboederij',
              value: 'V'
            },
            {
              label: 'Villa',
              value: 'X'
            }
          ]
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
          items: [
            {
              label: 'Before 1900',
              value: '1800'
            },
            {
              label: '1901 - 1945',
              value: '1901'
            },
            {
              label: '1946 - 1970',
              value: '1946'
            },
            {
              label: '1971 - 2000',
              value: '1971'
            },
            {
              label: '2001 - 2010',
              value: '2001'
            },
            {
              label: 'After 2011',
              value: '2011'
            }
          ]
        }
      },


    };
  }
}
