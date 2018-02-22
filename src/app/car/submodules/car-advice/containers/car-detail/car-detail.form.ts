import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { LicensePlateValidator } from '@app/components/knx-input-licenseplate/licenseplate.validator';
import { UIPair } from '@core/models/ui-pair';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { birthDateValidator, minNumberValidator, maxNumberValidator } from '@utils/base-form.validators';


export class CarDetailForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  /* istanbul ignore next */
  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`,
    licensePlate: () => `Het ingevulde kenteken is niet geldig`,
    licensePlateRDC: () => `Het ingevulde kenteken is niet geregistreerd`,
    birthDate: () => 'De ingevulde geboortedatum is niet geldig',
    gender: () => `Dit is een verplicht veld`,
    claimFreeYears: () => `De ingevulde waarde ligt niet tussen 0 en 50`
  };

  constructor(private fb: FormBuilder,
              private houseHold: Array<UIPair>,
              private gender: Array<UIPair>,
              private loan: Array<UIPair>,
              private copies: string[] = []) {
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
        label: this.copies['car.advice.steps.detail.form.licensePlate.label'],
        validationErrors: this.validationErrors,
        formControl: this.formGroup.get('licensePlate'),
        inputOptions: {
          placeholder: this.copies['car.advice.steps.detail.form.licensePlate.placeholder']
        }
      },
      birthDate: {
        formControlName: 'birthDate',
        label: this.copies['car.advice.steps.detail.form.birthDate.label'],
        type: 'date',
        formControl: this.formGroup.get('birthDate'),
        validationErrors: this.validationErrors,
        inputOptions: {
          decode: true,
          type: 'tel'
        }
      },
      claimFreeYears: {
        formControlName: 'claimFreeYears',
        label: this.copies['car.advice.steps.detail.form.claimFreeYears'],
        formControl: this.formGroup.get('claimFreeYears'),
        validationErrors: this.validationErrors,
        help: true,
        inputOptions: {
          type: 'tel',
          events: ['focus']
        }
      },
      loan: {
        formControlName: 'loan',
        label: this.copies['car.advice.steps.detail.form.loan.label'],
        type: 'radio',
        formControl: this.formGroup.get('loan'),
        validationErrors: this.validationErrors,
        help: true,
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          placeholder: '',
          items: this.loan
        }
      },
      houseHold: {
        formControlName: 'houseHold',
        label: this.copies['car.advice.steps.detail.form.houseHold.label'],
        type: 'select',
        formControl: this.formGroup.get('houseHold'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: this.copies['car.advice.steps.detail.form.houseHold.placeholder'],
          events: ['focus'],
          items: this.houseHold
        }
      },
      gender: {
        formControlName: 'gender',
        label: this.copies['car.advice.steps.detail.form.gender.label'],
        type: 'radio',
        formControl: this.formGroup.get('gender'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          placeholder: this.copies['car.advice.steps.detail.form.gender.placeholder'],
          items: this.gender
        }
      }
    };
  }
}
