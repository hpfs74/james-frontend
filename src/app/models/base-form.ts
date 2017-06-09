import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CXEmailValidator, CXPostalCodeValidator } from '@cx/form-control';
import { CXFormGroupOptions } from '@cx/form-group';

import { numberValidator } from '../utils/base-form.validators';

export class BaseForm {
  public formGroup: FormGroup;
  public formConfig: { any:CXFormGroupOptions<any> };
  public infoMessages: any;
  public validationSummaryError: string = 'Heb je alle velden (correct) ingevuld?';

  public createAddress(fb: FormBuilder): FormGroup {
    return fb.group({
      postalCode: [null, Validators.compose(
        [
          Validators.required,
          CXPostalCodeValidator
        ]
      )],
      houseNumber: [null, Validators.compose(
        [
          Validators.required,
          numberValidator('houseNumber')
        ]
      )],
      houseNumberExtension: [null]
    });
  }

  public isMobileNumber(phone: string) {
    if (phone && phone.length !== 10) {
      return false;
    }
    return (/^06[1-5]/.test(phone) || /^06760/.test(phone));
  }
}
