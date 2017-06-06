import { FormGroup } from '@angular/forms';

export class BaseForm {
  public formGroup: FormGroup;
  public formConfig: any;
  public validationSummaryError: string = 'Heb je alle velden (correct) ingevuld?';
}
