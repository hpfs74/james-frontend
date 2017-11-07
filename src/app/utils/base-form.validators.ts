import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { dateDecode } from '../utils/base-form.utils';
import { isValidIban } from './iban-validator';

export function maxNumberValidator(key: string, max: Number) {
  return (c: FormControl): { [key: string]: any } => {
    const input = c.value,
      isValid = input <= max;
    const obj = {};
    obj[key] = true;
    return !isValid ? obj : null;
  };
}

export function minNumberValidator(key: string, min: Number) {
  return (c: FormControl): { [key: string]: any } => {
    const input = c.value,
      isValid = input >= min;
    const obj = {};
    obj[key] = true;
    return !isValid ? obj : null;
  };
}

export function numberValidator(key: string) {
  return (c: FormControl): { [key: string]: any } => {
    const value = c.value;
    let valid = false;

    if (value) {
      const hasDot: boolean = value.indexOf('.') >= 0;
      // convert string to number
      const number: number = Math.floor(value);
      // get result of isInteger()
      const integer: boolean = Number.isInteger(number);
      // validate conditions
      valid = !hasDot && integer && number > 0;
    } else {
      valid = false;
    }
    const obj = {};
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
    const obj = {};
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

    const now = new Date().setHours(0, 0, 0, 0);
    if (value && (value < now)) {
      value = false;
    }

    const obj = {};
    obj[key] = true;
    return !value ? obj : null;
  };
}

export function maxDateValidator(key: string, maxYearFromNow: number) {
  return (c: FormControl): { [key: string]: any } => {
    let value = c.value;
    const today = new Date();
    const limit = today.setFullYear(today.getFullYear() + maxYearFromNow);

    if (value && !(value instanceof Date)) {
      value = dateDecode(value);
    }

    if (value && (value > limit)) {
      value = false;
    }

    const obj = {};
    obj[key] = true;
    return !value ? obj : null;
  };
}

export function birthDateValidator(key: string) {
  return (c: FormControl): { [key: string]: any } => {
    let value = c.value;
    const today = new Date();
    const minimumAge = today.setFullYear(today.getFullYear() - 18);

    if (value && !(value instanceof Date)) {
      value = dateDecode(value);
    }

    if (value && (value.getFullYear() < 1897 || value > minimumAge)) {
      value = false;
    }

    const obj = {};
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
    const value = c.value;
    const obj = {};
    obj[key] = true;
    const onlyDutch = true;
    return isValidIban(value, onlyDutch) ? null : obj;
  };
}

export function regExValidator(regex: RegExp, errorName: string) {
  return (fc: FormControl) => {
    const value = fc.value;
    const ok = value ? regex.test(value) : true;
    const result = {};
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

export function houseNumberValidator(key: string) {
  return regExValidator(/^\d+(-\d+)*$/, key);
}
