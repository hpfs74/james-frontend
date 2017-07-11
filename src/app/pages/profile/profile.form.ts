import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CXPostalCodeValidator } from '@cx/form-control';

import { BaseForm } from '../../forms/base-form';
import { nameInitialMask } from '../../utils/base-form.utils';
import { birthDateMask } from '../../utils/base-form.utils';

export class ProfileForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;
  addressForm: FormGroup;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    firstName: () => '',
    lastName: () => '',
    birthDate: () => 'Vul een geldige geboortedatum in',
    postalCode: () => `Vul een geldige postcode in`,
    address: () => `Vul een geldige postcode en huisnummer combinatie in`,
    houseNumber: () => `Vul een huisnummer in`,
  };

  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      avatar: [null],
      gender: [{}, Validators.required],
      firstName: [null, Validators.compose([Validators.maxLength(40)])],
      lastName: [null, Validators.compose([Validators.maxLength(40)])],
      birthDate: [null, Validators.required],
      pushNotifications: [null],
      emailNotifications: [null],
    });

    this.addressForm = this.createAddress(this.fb);

    this.formConfig = {
      avatar: {
        formControlName: 'avatar',
        formControl: this.formGroup.get('avatar'),
        validationErrors: this.validationErrors,
        label: '',
        type: 'file',
        events: ['file-uploaded'],
        inputOptions: {
          placeholder: ' '
        }
      },
      gender: {
        formControlName: 'gender',
        formControl: this.formGroup.get('gender'),
        validationErrors: this.validationErrors,
        label: 'Geslacht',
        type: 'radio',
        inputOptions: {
          items: [
            {
              label: 'Man',
              value: 'm'
            },
            {
              label: 'Vrouw',
              value: 'v'
            }
          ]
        }
      },
      firstName: {
        formControlName: 'firstName',
        formControl: this.formGroup.get('firstName'),
        validationErrors: this.validationErrors,
        label: 'Voornaam'
      },
      lastName: {
        formControlName: 'lastName',
        formControl: this.formGroup.get('lastName'),
        validationErrors: this.validationErrors,
        label: 'Achternaam'
      },
      birthDate: {
        formControlName: 'birthDate',
        formControl: this.formGroup.get('birthDate'),
        validationErrors: this.validationErrors,
        label: 'Geboortedatum',
        type: 'date-input',
        inputOptions: {
          placeholder: 'DD / MM / JJJJ',
          transform: birthDateMask.decode,
          textMask: birthDateMask
        }
      },
      pushNotifications: {
        formControlName: 'pushNotifications',
        formControl: this.formGroup.get('pushNotifications'),
        validationErrors: this.validationErrors,
        label: 'Notificaties',
        type: 'checkbox',
        inputOptions: {
          label: 'lk wil pushberichten ontvangen van Knab Verzekeren',
          value: 'pushNotifications'
        }
      },
      emailNotifications: {
        formControlName: 'emailNotifications',
        formControl: this.formGroup.get('emailNotifications'),
        validationErrors: this.validationErrors,
        label: '',
        type: 'checkbox',
        inputOptions: {
          label: 'Houd mij via e-mail op de hoogte van het laatste nieuws en persoonlijke aanbiedingen',
          value: 'emailNotifications'
        }
      },
    };
  }
}
