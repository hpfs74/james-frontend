import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIPair } from '@core/models/ui-pair';
import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';
import { ibanValidator } from '@utils/base-form.validators';
import { IBANMask } from '@utils/iban-tools';

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
      iban: [null, Validators.compose([Validators.required, ibanValidator('iban', 'nl')])]
    });

    this.formConfig = {

      iban: {
        formControlName: 'iban',
        formControl: this.formGroup.get('iban'),
        validationErrors: this.validationErrors,
        label: this.copies['household.payment_details.iban.label'],
        help: true,
        inputOptions: {
          type: 'text',
          textMask: IBANMask,
          placeholder: this.copies['household.payment_details.iban.placeholder'],
          attributes: {
            'aria-label': this.copies['household.payment_details.iban.label']
          }
        }
      }
    };
  }
}
