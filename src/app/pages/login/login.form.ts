import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CXEmailValidator } from '@cx/form';
import { BaseForm } from './../../models/base-form';

export class LoginForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  validationErrors = {
    required: () => 'Dit veld is verplicht',
    email: () => 'Vul een geldig e-mailadres in',
    password: () => 'Vul je wachtwoord in'
  };

  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      email: [null, Validators.compose(
        [Validators.required, CXEmailValidator]
      )],
      password: [null, Validators.compose(
        [Validators.required]
      )],
    });

    this.formConfig = {
      email: {
        formControlName: 'email',
        formControl: this.formGroup.get('email'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'E-mailadres',
          attributes: {
            'aria-label': 'Vul je e-mailadres in'
          }
        }
      },
      password: {
        formControlName: 'password',
        formControl: this.formGroup.get('password'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Wachtwoord',
          type: 'password',
          attributes: {
            'aria-label': 'Vul je wachtwoord in'
          }
        }
      }
    };
  }

}
