import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { KNXPostalCodeValidator } from '@knx/form-control';

import { BaseForm } from '@app/shared/forms/base-form';
import { AddressForm } from '@app/address/components/address.form';
import { nameInitialMask } from '@app/utils/base-form.utils';
import { dateValidator, birthDateValidator, minNumberValidator, maxNumberValidator } from '@app/utils/base-form.validators';
import { birthDateMask } from '@app/utils/base-form.utils';
import { UIPair } from '@app/core/models/ui-pair';

export class ProfileForm extends BaseForm {
  formGroup: FormGroup;
  addressForm: AddressForm;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit is een verplicht veld',
    firstName: () => 'Vul een voornaam van maximaal 50 karakters in',
    lastName: () => 'Vul een achternaam van maximaal 50 karakters in',
    birthDate: () => 'Vul een geldige geboortedatum in'
  };

  constructor(private fb: FormBuilder, houseHold: Array<UIPair>) {
    super();

    this.formGroup = this.fb.group({
      avatar: [null],
      gender: [{}],
      firstName: [null, Validators.compose([Validators.maxLength(50)])],
      lastName: [null, Validators.compose([Validators.maxLength(50)])],
      birthDate: [null, birthDateValidator('birthDate')],
      houseHold: [null, Validators.required],
      pushNotifications: [null],
      emailNotifications: [{}],
    });

    this.addressForm = new AddressForm(fb);
    this.addressForm.formConfig.postalCode.inputOptions.twoCols = true;
    this.formConfig = {
      avatar: {
        formControlName: 'avatar',
        formControl: this.formGroup.get('avatar'),
        validationErrors: this.validationErrors,
        label: '',
        type: 'file',
        events: ['file-uploaded'],
        inputOptions: {
          twoCols: true,
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
          twoCols: true,
          formGroupModifiers: ['knx-form-group__wrap--spread'],
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
        label: 'Voornaam',
        inputOptions: {
          twoCols: true
        }
      },
      lastName: {
        formControlName: 'lastName',
        formControl: this.formGroup.get('lastName'),
        validationErrors: this.validationErrors,
        label: 'Achternaam',
        inputOptions: {
          twoCols: true
        }
      },
      birthDate: {
        formControlName: 'birthDate',
        formControl: this.formGroup.get('birthDate'),
        validationErrors: this.validationErrors,
        label: 'Geboortedatum',
        type: 'date',
        inputOptions: {
          twoCols: true,
          decode: true
        }
      },
      houseHold: {
        formControlName: 'houseHold',
        label: 'Wat is je gezinssituatie?',
        type: 'select',
        formControl: this.formGroup.get('houseHold'),
        validationErrors: this.validationErrors,
        inputOptions: {
          twoCols: true,
          placeholder: 'Maak een keuze',
          events: ['focus'],
          items: houseHold
        }
      },
      pushNotifications: {
        formControlName: 'pushNotifications',
        formControl: this.formGroup.get('pushNotifications'),
        validationErrors: this.validationErrors,
        label: 'Notificaties',
        type: 'checkbox',
        inputOptions: {
          twoCols: true,
          label: 'lk wil pushberichten ontvangen van Knab Verzekeren',
          value: 'pushNotifications'
        }
      },
      emailNotifications: {
        formControlName: 'emailNotifications',
        formControl: this.formGroup.get('emailNotifications'),
        validationErrors: this.validationErrors,
        label: 'emailNotifications',
        type: 'radio',
        inputOptions: {
          twoCols: true,
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: [
            {
              label: 'Yes',
              value: true
            },
            {
              label: 'No',
              value: false
            }
          ]
        }
      },
    };
  }
}
