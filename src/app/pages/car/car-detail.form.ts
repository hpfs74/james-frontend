import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export class CarDetailForm {
  /* form for the first step in the flow */
  basicForm: FormGroup;

  // @TODO: create validators

  constructor(private fb: FormBuilder, public config: any) {
    this.basicForm = this.fb.group({
      license: ['', Validators.required],
      birthDate: ['', Validators.required],
      postalCode: ['', Validators.required],
      houseNumber: ['', Validators.required],
      houseNumberExtension: ['', Validators.required],
      damageFreeYears: ['', Validators.required],
      kilometerPerYear: ['', Validators.required]
    });
  }
}
