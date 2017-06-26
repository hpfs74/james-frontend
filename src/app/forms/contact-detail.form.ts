import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../forms/base-form';
import { nameInitialMask } from '../utils/base-form.utils';
import { phoneNumberValidator } from '../utils/base-form.validators';

export class ContactDetailForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  initialMask = nameInitialMask;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    minlength: () => 'Ongeldig telefoonnnummer',
    mobileNumber: () => 'Ongeldig telefoonnummer',
    phoneNumber: () => 'Ongeldig telefoonnummer',
    maxlength: (err) => `Je kunt maximaal ${err.requiredLength} tekens invullen`
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
      lastName: [null, Validators.required],
      mobileNumber: [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          phoneNumberValidator('mobileNumber')
        ])
      ],
      phoneNumber: [null,
        Validators.compose([
          Validators.minLength(10),
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
        validationErrors: this.validationErrors
      },
      lastName: {
        formControlName: 'lastName',
        label: 'Achternaam',
        formControl: this.formGroup.get('lastName'),
        validationErrors: this.validationErrors
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
