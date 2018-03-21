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
  constructor(private fb: FormBuilder, public copies: any) {
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
      receiveUpdate: [{}]
    });

    this.formConfig = {
      name: {
        formControlName: 'name',
        formControl: this.formGroup.get('name'),
        validationErrors: this.validationErrors,
        label: this.copies['household.premium.buy.your_name.label'],
        type: 'text',
        inputOptions: {
          placeholder: this.copies['household.premium.buy.your_name.placeholder'],
          attributes: {
            'aria-label': 'Your name'
          }
        }
      },
      email: {
        formControlName: 'email',
        formControl: this.formGroup.get('email'),
        validationErrors: this.validationErrors,
        label: this.copies['household.premium.buy.your_email.label'],

        inputOptions: {
          type: 'email',
          placeholder: this.copies['household.premium.buy.your_email.placeholder'],
          prefix: 'knx-icon-envelope',
          attributes: {
            'aria-label': 'Vul je e-mailadres in'
          }
        }
      },
      phone: {
        formControlName: 'phone',
        formControl: this.formGroup.get('phone'),
        label: this.copies['household.premium.buy.your_phone.label'],
        type: 'text',
        validationErrors: this.validationErrors,
        inputOptions: {
          prefix: 'knx-icon-phone',
          placeholder: this.copies['household.premium.buy.your_phone.placeholder'],
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
          items: [
            {
              label: this.copies['household.premium.buy.checkbox.label'],
              value: 'true'
            } as UIPair
          ]
        }
      }
    };
  }
}
