import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { createAddress, dateValidator } from '../../utils/base-form';

export class CarDetailForm {
  formGroup: FormGroup;
  addressForm: any;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      licensePlate: [null, Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
      birthDate: [null, Validators.required, dateValidator('date')],
      damageFreeYears: [null, Validators.required],
      kilometersPerYear: ['', Validators.required]
    });

    this.addressForm = createAddress(this.fb);
  }
}
