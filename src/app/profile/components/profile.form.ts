import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CXPostalCodeValidator } from '@cx/form-control';

import { BaseForm } from '../../shared/forms/base-form';
import { nameInitialMask } from '../../utils/base-form.utils';
import { dateValidator, birthDateValidator, minNumberValidator, maxNumberValidator } from '../../utils/base-form.validators';
import { birthDateMask } from '../../utils/base-form.utils';

export class ProfileForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;
  addressForm: FormGroup;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    firstName: () => 'Vul een voornaam van maximaal 50 karakters in',
    lastName: () => 'Vul een achternaam van maximaal 50 karakters in',
    birthDate: () => 'Vul een geldige geboortedatum in',
    postalCode: () => `Vul een geldige postcode in`,
    address: () => `Vul een geldige postcode en huisnummer combinatie in`,
    houseNumber: () => `Vul een huisnummer in`,
  };

  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      avatar: [null],
      gender: [{}],
      firstName: [null, Validators.compose([Validators.maxLength(50)])],
      lastName: [null, Validators.compose([Validators.maxLength(50)])],
      birthDate: [null, birthDateValidator('birthDate')],
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
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          items: [
            {
              label: 'Man',
              value: 'M'
            },
            {
              label: 'Vrouw',
              value: 'F'
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
