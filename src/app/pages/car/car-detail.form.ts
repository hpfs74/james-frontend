import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { createAddress, dateValidator, minNumberValidator, maxNumberValidator } from '../../utils/base-form.class';
import { LicensePlateValidator } from '../../components/knx-input-licenseplate/licenseplate.validator';

export class CarDetailForm {
  formGroup: FormGroup;
  addressForm: any;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    maxlength: (err) => `Value is too long! Use max ${err.requiredLength} characters`,
    licensePlate: () => `Vul een geldig kenteken in`,
    birthDate: () => 'Vul een geboortedatum in',
    postalCode: () => `Vul een geldige postcode in`,
    houseNumber: () => `Vul een huisnummer in`,
    damageFreeYears: () => `Vul schadevrije jaren in tussen 0 en 50`
  };

  constructor(private fb: FormBuilder) {
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
          dateValidator('birthDate')
        ]
      ],
      damageFreeYears: [null, Validators.compose(
        [
          Validators.required,
          minNumberValidator('damageFreeYears', 0),
          maxNumberValidator('damageFreeYears', 50)
        ]
      )],
      kilometersPerYear: ['', Validators.required],
      familyType: [null, Validators.required],
      gender: [null, Validators.required],
      loan: [null, Validators.required]
    });

    this.addressForm = createAddress(this.fb);
  }
}
