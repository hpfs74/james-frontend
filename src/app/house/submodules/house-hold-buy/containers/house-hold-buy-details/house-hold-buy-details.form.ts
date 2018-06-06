import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { UIPair } from '@app/core/models/ui-pair';
import { EmailValidator } from '@utils/email-validator';
import { nameInitialMask } from '@utils/base-form.utils';

export class HouseHoldDetailForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  initialMask = nameInitialMask;

  /* istanbul ignore next */
  validationErrors = {
    required: () => 'Dit is een verplicht veld',
  };

  constructor(private fb: FormBuilder,
              private gender: Array<UIPair>,
              public copies: any) {
    super();

    this.formGroup = this.fb.group({
      gender: [null, Validators.required],
      initials: [null, Validators.required],
      firstName: [null, Validators.required],
      infix: [null, null],
      lastName: [null, Validators.required],
      sameAddress: [true, Validators.required],
      email: [null, Validators.compose([Validators.required, EmailValidator])],
    });

    this.formConfig = {
      email: {
        formControlName: 'email',
        formControl: this.formGroup.get('email'),
        validationErrors: this.validationErrors,
        label: this.copies['household.premium.buy.your_email.label'],
        inputOptions: {
          type: 'email',
          placeholder: this.copies['household.premium.buy.your_email.placeholder'],
          prefix: 'knx-icon-envelope',
          attributes: {
            'aria-label': 'household.premium.buy.your_email.placeholder'
          }
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
      },
      initials: {
        formControlName: 'initials',
        formControl: this.formGroup.get('input'),
        label: this.copies['household.detail.form_initials_label'],
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: this.copies['household.detail.form_initials_placeholder'],
          decode: this.initialMask.decode,
          textMask: this.initialMask
        }
      },
      firstName: {
        formControlName: 'firstName',
        formControl: this.formGroup.get('input'),
        label: this.copies['household.detail.form_firstName_label'],
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: this.copies['household.detail.form_firstName_placeholder']
        }
      },
      infix: {
        formControlName: 'infix',
        formControl: this.formGroup.get('input'),
        label: this.copies['household.detail.form_prefix_label'],
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: this.copies['household.detail.form_prefix_placeholder']
        }
      },
      lastName: {
        formControlName: 'lastName',
        formControl: this.formGroup.get('input'),
        label: this.copies['household.detail.form_lastName_label'],
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: this.copies['household.detail.form_lastName_placeholder']
        }
      },
      sameAddress: {
        formControlName: 'sameAddress',
        type: 'radio',
        formControl: this.formGroup.get('sameAddress'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: [
            {
              value: true,
              label: this.copies['household.details.form_sameAddress_yes_value']
            },
            {
              value: false,
              label: this.copies['household.details.form_sameAddress_no_value']
            }
          ]
        }
      },
    };
  }
}
