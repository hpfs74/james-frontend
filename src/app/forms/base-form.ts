import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CXEmailValidator, CXPostalCodeValidator } from '@cx/form-control';
import { CXFormGroupOptions } from '@cx/form-group';

import { houseNumberalidator } from '../utils/base-form.validators';

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
          Validators.maxLength(15),
          houseNumberalidator('houseNumber')
        ]
      )],
      houseNumberExtension: [null, Validators.maxLength(15)]
    });
  }
}
