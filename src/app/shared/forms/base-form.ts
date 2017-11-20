import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { KNXEmailValidator } from '@knx/form-control';
import { KNXFormGroupOptions } from '@knx/form-group';

export class BaseForm {
  formGroup: FormGroup;
  formConfig: { any: KNXFormGroupOptions<any> };
  infoMessages: any;
  validationSummaryError = 'Heb je alle velden (correct) ingevuld?';
}
