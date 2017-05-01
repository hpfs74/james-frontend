import { FormControl } from '@angular/forms';

export function LicensePlateValidator(c: FormControl) {
  const LICENSEPLATE_REGEXP = /^[0-9a-z]{6,}$/gi;

  if (c.value === '') {
    return null;
  } else {
    // length should be at least 6
    if (LICENSEPLATE_REGEXP.test(c.value)) {
      let formats = new Array<RegExp>();
      formats[0] = /^[a-zA-Z]{2}[\d]{2}[\d]{2}$/;         //   1       XX-99-99
      formats[1] = /^[\d]{2}[\d]{2}[a-zA-Z]{2}$/;         //   2       99-99-XX
      formats[2] = /^[\d]{2}[a-zA-Z]{2}[\d]{2}$/;         //   3       99-XX-99
      formats[3] = /^[a-zA-Z]{2}[\d]{2}[a-zA-Z]{2}$/;     //   4       XX-99-XX
      formats[4] = /^[a-zA-Z]{2}[a-zA-Z]{2}[\d]{2}$/;     //   5       XX-XX-99
      formats[5] = /^[\d]{2}[a-zA-Z]{2}[a-zA-Z]{2}$/;     //   6       99-XX-XX
      formats[6] = /^[\d]{2}[a-zA-Z]{3}[\d]{1}$/;         //   7       99-XXX-9
      formats[7] = /^[\d]{1}[a-zA-Z]{3}[\d]{2}$/;         //   8       9-XXX-99
      formats[8] = /^[a-zA-Z]{2}[\d]{3}[a-zA-Z]{1}$/;     //   9       XX-999-X
      formats[9] = /^[a-zA-Z]{1}[\d]{3}[a-zA-Z]{2}$/;     //   10      X-999-XX

      for (let licensePlateRegEx of formats) {
        if (licensePlateRegEx.test(c.value)) {
          return null;
        }
      }
    }
  }
  // invalid if no matches
  return { licensePlate: true };
}


