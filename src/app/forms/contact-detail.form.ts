import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { nameInitialMask } from '../utils/base-form.utils';

export class ContactDetailForm {
  formGroup: FormGroup;
  formConfig: any;

  initialMask = nameInitialMask;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    maxlength: (err) => `Je kunt maximaal ${err.requiredLength} tekens invullen`
  };

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      initials: [null,
        Validators.compose([
          Validators.maxLength(5),
          Validators.required
        ])
      ],
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null, Validators.required],
      mobilePhone: [null, Validators.required],
      phone: [null],
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
        formControlName: 'mobilePhone',
        label: 'Mobiel nummer',
        formControl: this.formGroup.get('mobilePhone'),
        validationErrors: this.validationErrors
      },
      phone: {
        formControlName: 'phone',
        label: 'Vast telefoonnummer',
        placeholder: 'Optioneel',
        formControl: this.formGroup.get('phone'),
        validationErrors: this.validationErrors
      },
      saveToProfile: {
        formControlName: 'saveToProfile',
        type: 'checkbox',
        formControl: this.formGroup.get('saveToProfile'),
        inputOptions: {
          items: [
            { label: 'Mijn profiel updaten met deze gegevens', value: 'true' }
          ]
        }
      }
    };
  }
}
