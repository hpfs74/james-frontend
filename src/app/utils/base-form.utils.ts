import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import * as moment from 'moment';

// Scoll back to form; assumes there's only one form of this type on current page
export function scrollToForm(cssClass: string): void {
  const element = <HTMLElement>document.querySelector(cssClass);
  if (element) {
    window.scrollTo(0, element.offsetTop);
  }
}

export const birthDateMask = {
  mask: [/[0-9]/, /[0-9]/, ' ', '/', ' ', /[0-9]/, /[0-9]/, ' ', '/', ' ', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/],
  guide: true,
  keepCharPositions: false,
  decode: value => {
    const parts = value.replace(/[ _]/gim, '').split('/');

    const day = +parts[0];
    const month = +parts[1] - 1;
    const year = +parts[2];

    if (day > 0 && month >= 0 && year > 999) {
      const date = new Date(year, month, day);

      // check if day or month are not bigger then valid
      // note: in JS new Date(50, 60, 2016) is completely valid
      if (date.getDate() === day && date.getMonth() === month) {
        return date;
      }
    }
    return null;
  },
  pipe: createAutoCorrectedDatePipe('dd / mm / yyyy')
};

export function dateDecode(value) {
  const parts = value.replace(/[ _]/gim, '').split('/');

  const day = +parts[0];
  const month = +parts[1] - 1;
  const year = +parts[2];

  if (day > 0 && month >= 0 && year > 999) {
    const date = new Date(year, month, day);

    // check if day or month are not bigger then valid
    // note: in JS new Date(50, 60, 2016) is completely valid
    if (date.getDate() === day && date.getMonth() === month) {
      return date;
    }
  }

  return null;
}

export const nameInitialMask = {
  mask: [/[a-zA-Z]/, '.', /[a-zA-Z]/, '.', /[a-zA-Z]/, '.', /[a-zA-Z]/, '.', /[a-zA-Z]/, '.'],
  guide: false,
  decode: value => {
    return value.replace(/[ .]/gim, '');
  },
  pipe: (conformedValue) => {
    return conformedValue.toUpperCase();
  }
};

export const postalCodeMask = {
  mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[a-zA-Z]/, /[a-zA-Z]/],
  guide: true,
  decode: value => {
    return value.replace(/[ .]/gim, '');
  },
  pipe: function (conformedValue) {
    return conformedValue.toUpperCase();
  }
};

export const pick = function (data, keys) {
  let result = {};
  keys.forEach(function (key) {
    if (data.hasOwnProperty(key)) {
      result[key] = data[key];
    }
  });
  return result;
};

export const pickDefined = function (data, keys) {
  let result = {};
  keys.forEach(function (key) {
    if (data.hasOwnProperty(key) && data[key] !== null) {
      result[key] = data[key];
    }
  });
  return result;
};

export const getNumbers = function (str: string) {
  return str.match(/\d+/g);
};

export const hasControlRequiredValidator = function (fc: FormControl | AbstractControl) {
  let required = false;
  if (fc.validator) {
    let validationResult = fc.validator(fc);
    required = (validationResult !== null && validationResult.required);
  }
  return required;
};

export const getMatchingValueObj = function (form: FormGroup, valueObj: any) {
  return pickDefined(valueObj, Object.keys(form.controls));
};

export const validateControls = function (form: FormGroup, controls: string[]) {
  Object.keys(form.controls)
    .filter(key => controls.indexOf(key) !== -1)
    .forEach(key => {
      let ctrl = form.get(key);

      if (hasControlRequiredValidator(ctrl)) {
        ctrl.markAsTouched();
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity();
      }
    });
};

export const updateAndValidateControls = function (fg: FormGroup, valueObj: any) {
  let updateObj = getMatchingValueObj(fg, valueObj);

  if (updateObj && Object.keys(updateObj).length > 0) {
    // update form control values
    fg.patchValue(updateObj, { emitEvent: false });

    // run validation only on updated controls
    validateControls(fg, Object.keys(updateObj));
  }
};

export const validateForm = function (form: FormGroup) {
  Object.keys(form.controls).forEach(key => {
    form.get(key).markAsTouched();
    form.get(key).markAsDirty();
  });
  form.updateValueAndValidity();
};

export const isMobileNumber = function (phone: string) {
  if (phone && phone.length !== 10) {
    return false;
  }
  return (/^06[1-5]/.test(phone) || /^06760/.test(phone));
};

export const toDateFormat = function (date: Date) {
  if (date === null) {
    return null;
  }
  return moment(date).format('DD-MM-YYYY');
};

export const parseNicciDate = function (date: string): Date {
  if (date === null) {
    return null;
  }
  return moment(date, 'YYYY-MM-DD').toDate();
};

export const toNicciDate = function (date: Date|string) {
  return moment(date).format('YYYY-MM-DD');
};
