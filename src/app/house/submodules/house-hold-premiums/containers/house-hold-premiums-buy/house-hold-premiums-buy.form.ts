import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIPair } from '@core/models/ui-pair';
import { EmailValidator } from '@utils/email-validator';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { emptyOrPhoneNumberValidator, phoneNumberValidator } from '@utils/base-form.validators';

/**
 * describe the form filters
 */
export class HouseHoldPremiumsBuyForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };
  validationErrors = {
    required: () => 'Dit is een verplicht veld',
    email: () => 'Vul een geldig e-mailadres in alsjeblieft',
    phone: () => 'Het ingevulde mobiele nummer is niet geldig'
  };

  /**
   * default constructor
   *
   * @param {FormBuilder} fb - the form object to bind
   * @param {Array<UIPair>} coverages - the list of avilable coverage
   */
  constructor(private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, EmailValidator])],
      phone: [null, Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          phoneNumberValidator('phone')
        ]
      )],
      receiveUpdate: [null]
    });

    this.formConfig = {
      name: {
        formControlName: 'name',
        formControl: this.formGroup.get('name'),
        validationErrors: this.validationErrors,
        label: 'Your name',
        type: 'text',
        inputOptions: {
          placeholder: 'Sarah',
          attributes: {
            'aria-label': 'Your name'
          }
        }
      },
      email: {
        formControlName: 'email',
        formControl: this.formGroup.get('email'),
        validationErrors: this.validationErrors,
        label: 'Je e-mailadres',

        inputOptions: {
          type: 'email',
          placeholder: 'E-mailadres',
          prefix: 'knx-icon-envelope',
          attributes: {
            'aria-label': 'Vul je e-mailadres in'
          }
        }
      },
      phone: {
        formControlName: 'phone',
        formControl: this.formGroup.get('phone'),
        label: 'Phone number',
        type: 'text',
        validationErrors: this.validationErrors,
        inputOptions: {
          prefix: 'knx-icon-phone',
          placeholder: '0612345678',
          attributes: {
            'aria-label': 'Your phone number'
          }
        }
      },
      receiveUpdate: {
        formControlName: 'receiveUpdate',
        formControl: this.formGroup.get('receiveUpdate'),
        type: 'checkbox',
        inputOptions: {
          label: 'I want to receive updates regarding Knab services',
          value: 'true'

        } as UIPair
      }
    };
  }
}
