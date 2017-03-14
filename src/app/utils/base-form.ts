import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CXPostalCodeValidator } from '../../../node_modules/@cx/form';
import { dateMask } from '../../../node_modules/@cx/input';

export function createAddress(fb: FormBuilder): FormGroup {
  return fb.group({
    postalCode: [null, Validators.compose(
      [Validators.required,
        CXPostalCodeValidator
      ])],
    addressNumber: [null, Validators.required],
    addressNumberExtension: [null],
    addressStreet: [null],
    addressCity: [null]
  });
}

export function dateValidator(key: string) {
  return function DateValidator(c: FormControl) {
    let value = c.value;
    if (value) {
      value = dateMask.decode(value);
    }
    let obj = {};
    obj[key] = true;
    return !value ? obj : null;
  };
}
