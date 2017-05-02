import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CXPostalCodeValidator } from '../../../node_modules/@cx/form';
import { dateMask } from '../../../node_modules/@cx/input';

export function createAddress(fb: FormBuilder): FormGroup {
  return fb.group({
    postalCode: [null, Validators.compose(
      [
        Validators.required,
        CXPostalCodeValidator
      ]
    )],
    houseNumber: [null, Validators.required],
    houseNumberExtension: [null]
  });
}

export function maxNumberValidator(key: string, max: Number) {
  return (c: FormControl): {[key: string]: any} => {
    const input = c.value,
      isValid = input <= max;
    let obj = {};
    obj[key] = true;
    return !isValid ? obj : null;
  };
}

export function minNumberValidator(key: string, min: Number) {
  return (c: FormControl): {[key: string]: any} => {
    const input = c.value,
      isValid = input >= min;
    let obj = {};
    obj[key] = true;
    return !isValid ? obj : null;
  };
}

export function dateValidator(key: string) {
  return (c: FormControl): {[key: string]: any} => {
    let value = c.value;
    if (value && !(value instanceof Date)) {
      value = dateMask.decode(value);
    }
    let obj = {};
    obj[key] = true;
    return !value ? obj : null;
  };
}

export function birthDateValidator(key: string) {
  return (c: FormControl): {[key: string]: any} => {
    let value = c.value;

    if (value && !(value instanceof Date)) {
      value = dateMask.decode(value);
    }

    if (value && (value.getFullYear() < 1897 || value.getFullYear() > 1999)) {
      value = false;
    }

    let obj = {};
    obj[key] = true;
    return !value ? obj : null;
  };
}
