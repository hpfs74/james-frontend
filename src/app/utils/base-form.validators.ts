import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { dateDecode } from '../utils/base-form.utils';
import { isValidIban } from './iban-validator';

export function maxNumberValidator(key: string, max: Number) {
  return (c: FormControl): { [key: string]: any } => {
    const input = c.value,
      isValid = input <= max;
    let obj = {};
    obj[key] = true;
    return !isValid ? obj : null;
  };
}

export function minNumberValidator(key: string, min: Number) {
  return (c: FormControl): { [key: string]: any } => {
    const input = c.value,
      isValid = input >= min;
    let obj = {};
    obj[key] = true;
    return !isValid ? obj : null;
  };
}

export function numberValidator(key: string) {
  return (c: FormControl): { [key: string]: any } => {
    let value = c.value;
    let valid: boolean = false;

    if (value) {
      let hasDot: boolean = value.indexOf('.') >= 0 ? true : false;
      // convert string to number
      let number: number = Math.floor(value);
      // get result of isInteger()
      let integer: boolean = Number.isInteger(number);
      // validate conditions
      valid = !hasDot && integer && number > 0;
    } else {
      valid = false;
    }
    let obj = {};
    obj[key] = true;
    return !value || !valid ? obj : null;
  };
}

export function dateValidator(key: string) {
  return (c: FormControl): { [key: string]: any } => {
    let value = c.value;
    if (value && !(value instanceof Date)) {
      value = dateDecode(value);
    }
    let obj = {};
    obj[key] = true;
    return !value ? obj : null;
  };
}

export function futureDateValidator(key: string) {
  return (c: FormControl): { [key: string]: any } => {
    let value = c.value;

    if (value && !(value instanceof Date)) {
      value = dateDecode(value);
    }

    let now = new Date().setHours(0, 0, 0, 0);
    if (value && (value < now)) {
      value = false;
    }

    let obj = {};
    obj[key] = true;
    return !value ? obj : null;
  };
}

export function birthDateValidator(key: string) {
  return (c: FormControl): { [key: string]: any } => {
    let value = c.value;
    let today = new Date();
    const minimumAge = today.setFullYear(today.getFullYear() - 18);

    if (value && !(value instanceof Date)) {
      value = dateDecode(value);
    }

    if (value && (value.getFullYear() < 1897 || value > minimumAge)) {
      value = false;
    }

    let obj = {};
    obj[key] = true;
    return !value ? obj : null;
  };
}

/**
 * @desc Validate an IBAN number
 * @see {@link  https://github.com/jquery-validation/jquery-validation/blob/master/src/additional/iban.js|GitHub}
 * @param {string} key
 */
export function ibanValidator(key: string) {
  return (c: FormControl) => {
    let value = c.value;
    let obj = {};
    obj[key] = true;
    const onlyDutch = true;
    return isValidIban(value, onlyDutch) ? null : obj;
  };
}

export function regExValidator(regex : RegExp, errorName : string) {
  return (fc: FormControl) => {
    let value = fc.value;
    let ok = value ? regex.test(value) : true;
    let result = {};
    result[errorName] = true;
    return ok ? null : result;
  };
}

export function phoneNumberValidator(key: string) {
  return regExValidator(/^\+?[0-9]+$/, key);
}

export function carReportingCodeValidator(key: string) {
  return regExValidator(/^[0-9]{4}$/, key);
}
