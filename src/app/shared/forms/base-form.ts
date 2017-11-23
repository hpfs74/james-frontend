import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CXEmailValidator } from '@cx/form-control';
import { CXFormGroupOptions } from '@cx/form-group';

export class BaseForm {
  formGroup: FormGroup;
  formConfig: { any: CXFormGroupOptions<any> };
  infoMessages: any;
  validationSummaryError = 'Heb je alle velden (correct) ingevuld?';
}
