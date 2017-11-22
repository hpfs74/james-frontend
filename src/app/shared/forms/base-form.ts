import { FormGroup, AbstractControl, FormControl, FormBuilder, Validators } from '@angular/forms';
import { KNXEmailValidator } from '@knx/form-control';
import { KNXFormGroupOptions } from '@knx/form-group';

export interface KNXCustomFormGroupOptions<T> extends KNXFormGroupOptions<T> {
  formControlName: string;
}

export abstract class BaseForm {
  abstract formGroup: FormGroup;
  abstract formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };
  validationSummaryError = 'Heb je alle velden (correct) ingevuld?';
}

