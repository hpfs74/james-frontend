import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../../shared/forms/base-form';
import { dateValidator, birthDateValidator, minNumberValidator, maxNumberValidator } from '../../../utils/base-form.validators';
import { birthDateMask } from '../../../utils/base-form.utils';
import { LicensePlateValidator } from '../../../components/knx-input-licenseplate/licenseplate.validator';

export class CarDetailForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`,
    licensePlate: () => `Het ingevulde kenteken is niet geldig`,
    licensePlateRDC: () => `Het ingevulde kenteken is niet geregistreerd`,
    birthDate: () => 'De ingevulde geboortedatum is niet geldig',
    gender: () => `Dit is een verplicht veld`,
    claimFreeYears: () => `De ingevulde waarde ligt niet tussen 0 en 50`
  };

  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      licensePlate: [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(8),
          LicensePlateValidator
        ]
      )],
      birthDate: [null,
        [
          Validators.required,
          birthDateValidator('birthDate')
        ]
      ],
      claimFreeYears: [null, Validators.compose(
        [
          Validators.required,
          minNumberValidator('claimFreeYears', 0),
          maxNumberValidator('claimFreeYears', 50)
        ]
      )],
      houseHold: [null, Validators.required],
      loan: [null, Validators.required],
      gender: [null, Validators.required],
      coverage: [null, Validators.required]
    });

    this.formConfig = {
      licensePlate: {
        formControlName: 'licensePlate',
        type: 'custom',
        label: 'Wat is je kenteken?',
        validationErrors: this.validationErrors,
        formControl: this.formGroup.get('licensePlate'),
        inputOptions: {
          placeholder: 'AF-19-65'
        }
      },
      birthDate: {
        formControlName: 'birthDate',
        label: 'Geboortedatum',
        type: 'date-input',
        formControl: this.formGroup.get('birthDate'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'DD / MM / JJJJ',
          transform: birthDateMask.decode,
          textMask: birthDateMask
        }
      },
      claimFreeYears: {
        formControlName: 'claimFreeYears',
        label: 'Aantal schadevrije jaren',
        formControl: this.formGroup.get('claimFreeYears'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'number',
          events: ['focus']
        }
      },
      loan: {
        formControlName: 'loan',
        label: 'Heb je een lening?',
        type: 'radio',
        formControl: this.formGroup.get('loan'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          placeholder: '',
          items: [
            {
              label: 'Ja',
              value: true
            },
            {
              label: 'Nee',
              value: false
            }
          ]
        }
      },
      houseHold: {
        formControlName: 'houseHold',
        label: 'Wat is je gezinssituatie?',
        type: 'select',
        formControl: this.formGroup.get('houseHold'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          events: ['focus'],
          items: [
            {
              label: 'Alleen ik',
              value: 'CHM'
            },
            {
              label: 'Mijn partner en ik',
              value: 'CHMP'
            },
            {
              label: 'Mijn partner, kinderen en ik',
              value: 'CHMPK'
            },
            {
              label: 'Mijn kinderen en ik',
              value: 'CHMK'
            }
          ]
        }
      },
      gender: {
        formControlName: 'gender',
        label: 'Geslacht',
        type: 'radio',
        formControl: this.formGroup.get('gender'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          placeholder: 'Selecteer je geslacht',
          items: [
            {
              label: 'Man',
              value: 'M'
            },
            {
              label: 'Vrouw',
              value: 'F'
            }
          ]
        }
      }
    };
  }
}
