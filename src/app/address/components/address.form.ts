import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CXPostalCodeValidator } from '@cx/form-control';
import { CXFormGroupOptions } from '@cx/form-group';

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
          CXPostalCodeValidator
        ]
      )],
      houseNumber: [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(15),
          houseNumberValidator('houseNumber')
        ]
      )],
      houseNumberExtension:
        [
          null,
          Validators.compose(
            [
              houseNumberValidator('houseNumber'),
              Validators.maxLength(6)
            ]
          ),
        ]
    });

    this.validationErrors = {
      required: () => 'Dit veld is verplicht',
      postalCode: () => `Vul een geldige postcode in`,
      address: () => `Dit adres bestaat niet. Probeer het nog eens`,
      houseNumber: () => `Vul een huisnummer in`
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
          type: 'text'
        }
      },
      houseNumberExtension: {
        formControl: this.formGroup.get('houseNumberExtension'),
        label: 'Toevoeging',
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Optioneel'
        }
      }
    };
  }
}
