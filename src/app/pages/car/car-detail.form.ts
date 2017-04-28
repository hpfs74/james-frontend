import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { createAddress, dateValidator } from '../../utils/base-form';
import { LicensePlateValidator } from '../../components/knx-input-licenseplate/licenseplate.validator';

export class CarDetailForm {
  formGroup: FormGroup;
  addressForm: any;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      licensePlate: [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(8),
          LicensePlateValidator
        ]
      )],
      birthDate: [null, Validators.compose(
        [
          Validators.required,
          dateValidator('birthDate')
        ]
      )],
      damageFreeYears: [null, Validators.required],
      kilometersPerYear: ['', Validators.required]
    });

    this.addressForm = createAddress(this.fb);
  }
}
