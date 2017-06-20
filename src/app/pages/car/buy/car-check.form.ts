import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../../models/base-form';
import { nameInitialMask } from '../../utils/base-form.utils';

export class CarCheckForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit veld is verplicht'
  };

  constructor( private fb: FormBuilder ) {
    super();

    this.formGroup = this.fb.group({
      bankruptcy: [null, Validators.compose([Validators.required])],
      debt: [null, Validators.compose([Validators.required])],
      refuse: [null, Validators.compose([Validators.required])],
      driver: [null, Validators.compose([Validators.required])],
      cause: [null, Validators.compose([Validators.required])],
      register: [null, Validators.compose([Validators.required])],
    });

    this.formConfig = {
      bankruptcy: {
        formControlName: 'bankruptcy',
        label: 'Ben je de afgelopen 8 jaar in aanraking geweest met politie of justie?',
        type: 'radio',
        formControl: this.formGroup.get('bankruptcy'),
        validationErrors: this.validationErrors,
        inputOptions: {
          items: [
            {
              label: 'Ja',
              value: 'wasBankruptcy'
            },
            {
              label: 'Nee',
              value: 'noBankruptcy'
            }
          ]
        }
      },
      refuse: {
        formControlName: 'refuse',
        label: 'Ben je de afgelopen 8 jaar geweigerd 0f opgezegd door een verzekeraar? ' +
        'Of was je betrokken bij verzekeringsfraude? ',
        type: 'radio',
        formControl: this.formGroup.get('refuse'),
        validationErrors: this.validationErrors,
        inputOptions: {
          items: [
            {
              label: 'Ja',
              value: 'wasRefuse'
            },
            {
              label: 'Nee',
              value: 'noRefuse'
            }
          ]
        }
      },
      debt: {
        formControlName: 'debt',
        label: 'Ben je de afgelopen 5 jaar failliet verklaard? Of in een schuldsanering betrokken geweest? Of heeft ' +
        'een deurwaarder momenteel beslag gelegd op jouw inkomsten of bezittingen?',
        formControl: this.formGroup.get('debt'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          items: [
            {
              label: 'Ja',
              value: 'wasDebt'
            },
            {
              label: 'Nee',
              value: 'noDebt'
            }
          ]
        }
      },
      driver: {
        formControlName: 'driver',
        label: 'Is jou, de regelmatige bestuurder of kentekenhouder de afgelopen 8 jaar de ' +
        'rijbevoegdheid (geheel 0f voorwaardelijk) ontzegd?',
        formControl: this.formGroup.get('driver'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          items: [
            {
              label: 'Ja',
              value: 'isDriver'
            },
            {
              label: 'Nee',
              value: 'notDriver'
            }
          ]
        }
      },
      cause: {
        formControlName: 'cause',
        label: 'Heb je de afgelopen 5 jaar schade geleden 0f veroorzaakt, die gedekt werd door een ' +
        'soortgelijke verzekering als de verzekering die je nu aanvraagt?',
        formControl: this.formGroup.get('cause'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          items: [
            {
              label: 'Ja',
              value: 'hadCause'
            },
            {
              label: 'Nee',
              value: 'noCause'
            }
          ]
        }
      },
      register: {
        formControlName: 'register',
        label: 'Is de auto vanaf de datum dat deze op naam van de kentekenhouder staat, langer dan IO dagen onverzekerd?',
        formControl: this.formGroup.get('register'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          items: [
            {
              label: 'Ja',
              value: 'isRegistered'
            },
            {
              label: 'Nee',
              value: 'notRegistered'
            }
          ]
        }
      }
    };
  }
}
