import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { trueValidator } from '@app/utils/base-form.validators';

export class HouseHoldBuyLegalForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  public validationErrors = {
    required: () => 'Dit is een verplicht veld',
    trueError: (obj) => obj.errorMsg
  };

  constructor( private fb: FormBuilder, public copies: any ) {
    super();

    this.formGroup = this.fb.group({
      refuse: [null, Validators.compose([
        trueValidator(this.copies['household.legal.error']),
        Validators.required
      ])],
      crime: [null, Validators.compose([
        trueValidator(this.copies['household.legal.error']),
        Validators.required
      ])],
      harmed: [null, Validators.compose([
        trueValidator(this.copies['household.legal.error']),
        Validators.required
      ])],
      bankrupt: [null, Validators.compose([
        trueValidator(this.copies['household.legal.error']),
        Validators.required
      ])],
      fraud: [null, Validators.compose([
        trueValidator(this.copies['household.legal.error']),
        Validators.required
      ])],
      seizedIncome: [null, Validators.compose([
        trueValidator(this.copies['household.legal.error']),
        Validators.required
      ])],
      driver: [null, Validators.compose([
        trueValidator(this.copies['household.legal.error']),
        Validators.required
      ])],
    });

    this.formConfig = {
      refuse: {
        formControlName: 'refuse',
        label: this.copies['household.legal.q1'],
        type: 'radio',
        formControl: this.formGroup.get('refuse'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      crime: {
        formControlName: 'crime',
        label: this.copies['household.legal.q2'],
        type: 'radio',
        formControl: this.formGroup.get('crime'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      harmed: {
        formControlName: 'harmed',
        label: this.copies['household.legal.q3'],
        formControl: this.formGroup.get('harmed'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      bankrupt: {
        formControlName: 'bankrupt',
        label: this.copies['household.legal.q4'],
        formControl: this.formGroup.get('bankrupt'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      fraud: {
        formControlName: 'fraud',
        label: this.copies['household.legal.q5'],
        formControl: this.formGroup.get('fraud'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      seizedIncome: {
        formControlName: 'seizedIncome',
        label: this.copies['household.legal.q6'],
        formControl: this.formGroup.get('seizedIncome'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      driver: {
        formControlName: 'driver',
        label: this.copies['household.legal.q7'],
        formControl: this.formGroup.get('driver'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
    };
  }

  private getBooleanItems() {
    return [
      { label: 'Ja', value: true },
      { label: 'Nee', value: false }
    ];
  }
}
