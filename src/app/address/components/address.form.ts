import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KNXPostalCodeValidator } from '@knx/form-control';

import { houseNumberValidator } from '../../utils/base-form.validators';
import { postalCodeMask } from '../../utils/base-form.utils';

export class AddressForm {
  formGroup: FormGroup;
  formConfig: any;
  validationErrors: any;
  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      postalCode: [null, Validators.compose(
        [
          Validators.required,
          KNXPostalCodeValidator
        ]
      )],
      houseNumber: [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(15),
          houseNumberValidator('houseNumber')
        ]
      )],
      houseNumberExtension: [null, Validators.compose(
        [
          Validators.required
        ]
      )]
    });

    this.validationErrors = {
      required: () => 'Dit is een verplicht veld',
      postalCode: () => `Vul een geldige postcode in`,
      address: () => `Dit adres bestaat niet. Probeer het nog eens`,
      houseNumber: () => `Vul geldig huisnummer in, geen toevoeging`,
      houseNumberExtension: () => `bla`
    };

    this.formConfig = {
      postalCode: {
        formControl: this.formGroup.get('postalCode'),
        label: 'Postcode',
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '1234 AB',
          textMask: postalCodeMask,
          transform: postalCodeMask.decode
        }
      },
      houseNumber: {
        formControl: this.formGroup.get('houseNumber'),
        label: 'Huisnummer',
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'tel'
        }
      },
      houseNumberExtension: {
        formControlName: 'houseNumberExtension',
        label: 'Toevoeging',
        type: 'select',
        formControl: this.formGroup.get('houseNumberExtension'),
        validationErrors: this.validationErrors,
        inputOptions: {
          events: ['change'],
          items: [],
          disabled: true
        }
      },
    };
  }
}
