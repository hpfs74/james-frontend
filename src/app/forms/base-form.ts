import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CXEmailValidator, CXPostalCodeValidator } from '@cx/form-control';
import { CXFormGroupOptions } from '@cx/form-group';

import { houseNumberValidator } from '../utils/base-form.validators';

export class BaseForm {
  public formGroup: FormGroup;
  public formConfig: { any: CXFormGroupOptions<any> };
  public infoMessages: any;
  public validationSummaryError = 'Heb je alle velden (correct) ingevuld?';

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
          Validators.maxLength(15),
          houseNumberValidator('houseNumber')
        ]
      )],
      houseNumberExtension: [null, Validators.maxLength(15)]
    });
  }
}
