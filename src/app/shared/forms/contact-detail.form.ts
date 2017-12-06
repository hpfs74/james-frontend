import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../shared/forms/base-form';
import { nameInitialMask } from '../../utils/base-form.utils';
import { phoneNumberValidator } from '../../utils/base-form.validators';
import { EmailValidator } from '../../utils/email-validator';

export class ContactDetailForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  initialMask = nameInitialMask;

  public validationErrors = {
    required: () => 'Dit is een verplicht veld',
    minlength: () => 'Het ingevulde telefoonnummer is niet geldig',
    mobileNumber: () => 'Het ingevulde mobiele nummer is niet geldig',
    phoneNumber: () => 'Het ingevulde telefoonnummer is niet geldig',
    maxlength: (err) => `Vul maximaal ${err.requiredLength} tekens in`
  };

  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      initials: [null,
        Validators.compose([
          Validators.required
        ])
      ],
      firstName: [null, Validators.required],
      middleName: [null],
      email: [null, Validators.compose([
          Validators.required,
          EmailValidator
        ])
      ],
      lastName: [null, Validators.required],
      mobileNumber: [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          phoneNumberValidator('mobileNumber')
        ])
      ],
      phoneNumber: [null,
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
          phoneNumberValidator('phoneNumber')
        ])
      ],
      saveToProfile: [{}]
    });

    this.formConfig = {
      initials: {
        formControlName: 'initials',
        label: 'Voorletters',
        formControl: this.formGroup.get('initials'),
        validationErrors: this.validationErrors,
        inputOptions: {
          decode: this.initialMask.decode,
          textMask: this.initialMask
        }
      },
      middleName: {
        formControlName: 'middleName',
        label: 'Tussenvoegsel',
        formControl: this.formGroup.get('middleName'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Optioneel'
        }
      },
      firstName: {
        formControlName: 'firstName',
        label: 'Voornaam',
        formControl: this.formGroup.get('firstName'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'text'
        }
      },
      lastName: {
        formControlName: 'lastName',
        label: 'Achternaam',
        type: 'text',
        formControl: this.formGroup.get('lastName'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'text'
        }
      },
      mobilePhone: {
        formControlName: 'mobileNumber',
        description: 'voorbeeld: 0612345678',
        label: 'Mobiel nummer',
        formControl: this.formGroup.get('mobileNumber'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'text'
        }
      },
      phone: {
        formControlName: 'phoneNumber',
        label: 'Vast telefoonnummer',
        description: 'voorbeeld: 0701234567',
        formControl: this.formGroup.get('phoneNumber'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Optioneel',
          type: 'text'
        }
      },
      email: {
        formControlName: 'email',
        formControl: this.formGroup.get('email'),
        validationErrors: this.validationErrors,
        showErrorMessages: false,
        label: 'E-mailadres',
        inputOptions: {
          type: 'email',
          placeholder: 'E-mailadres',
          prefix: 'knx-icon-envelope',
          attributes: {
            'aria-label': 'E-mailadres'
          }
        }
      },
      saveToProfile: {
        formControlName: 'saveToProfile',
        type: 'checkbox',
        formControl: this.formGroup.get('saveToProfile'),
        inputOptions: {
          items: [
            { label: 'Gegevens opslaan in mijn Knab Verzekeren profiel', value: 'true' }
          ]
        }
      }
    };
  }
}
