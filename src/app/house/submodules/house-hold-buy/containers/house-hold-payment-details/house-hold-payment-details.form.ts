import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIPair } from '@core/models/ui-pair';
import { EmailValidator } from '@utils/email-validator';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { emptyOrPhoneNumberValidator, ibanValidator, phoneNumberValidator } from '@utils/base-form.validators';

/**
 * describe the form filters
 */
export class HouseHoldPaymentDetailsForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };
  validationErrors = {
    required: () => this.copies['general.errors.field_is_required'], // 'Dit is een verplicht veld',
    iban: () => this.copies['general.errors.iban_is_invalid']
  };

  /**
   * default constructor
   *
   * @param {FormBuilder} fb - the form object to bind
   * @param {Array<UIPair>} coverages - the list of avilable coverage
   */
  constructor(private fb: FormBuilder, private copies: any) {
    super();


    this.formGroup = this.fb.group({
      iban: [null, Validators.compose([Validators.required, ibanValidator('iban', 'nl')])],
      agreeKnabTAC: [{}],
      agreeRiskTAC: [{}]
    });

    this.formConfig = {

      iban: {
        formControlName: 'iban',
        formControl: this.formGroup.get('iban'),
        validationErrors: this.validationErrors,
        label: this.copies['household.payment_details.iban.label'],
        inputOptions: {
          type: 'text',
          placeholder: this.copies['household.payment_details.iban.placeholder'],
          attributes: {
            'aria-label': this.copies['household.payment_details.iban.label']
          }
        }
      },
      agreeKnabTAC: {
        formControlName: 'agreeKnabTAC',
        formControl: this.formGroup.get('agreeKnabTAC'),
        type: 'checkbox',
        inputOptions: {
          items: [
            {
              label: this.copies['household.payment_details.knabtac.label'],
              value: 'true'
            } as UIPair
          ]
        }
      },
      agreeRiskTAC: {
        formControlName: 'agreeRiskTAC',
        formControl: this.formGroup.get('agreeRiskTAC'),
        type: 'checkbox',
        inputOptions: {
          items: [
            {
              label: this.copies['household.payment_details.risktac.label'],
              value: 'true'
            } as UIPair
          ]
        }
      }
    };
  }
}
