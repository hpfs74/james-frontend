import { FormControl } from '@angular/forms';
import { getLicenseFormats } from '../../utils/licensePlate.util';

export function LicensePlateValidator(c: FormControl) {
  const LICENSEPLATE_REGEXP = /^[0-9a-z]{6,}$/gi;

  if (c.value === '') {
    return null;
  } else {
    // length should be at least 6
    if (LICENSEPLATE_REGEXP.test(c.value)) {
      const formats = getLicenseFormats();

      for (const licensePlateRegEx of formats) {
        if (licensePlateRegEx.test(c.value)) {
          return null;
        }
      }
    }
  }
  // invalid if no matches
  return { licensePlate: true };
}


