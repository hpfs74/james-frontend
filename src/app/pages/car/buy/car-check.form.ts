import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../../forms/base-form';
import { nameInitialMask } from '../../../utils/base-form.utils';

export class CarCheckForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit veld is verplicht'
  };

  constructor( private fb: FormBuilder ) {
    super();

    this.formGroup = this.fb.group({
      crime: [null, Validators.compose([Validators.required])],
      debt: [null, Validators.compose([Validators.required])],
      refuse: [null, Validators.compose([Validators.required])],
      driver: [null, Validators.compose([Validators.required])],
      cause: [null, Validators.compose([Validators.required])],
      register: [null, Validators.compose([Validators.required])],
    });

    this.formConfig = {
      crime: {
        formControlName: 'crime',
        label: 'Ben je de afgelopen 8 jaar in aanraking geweest met politie of justitie?',
        type: 'radio',
        formControl: this.formGroup.get('crime'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      refuse: {
        formControlName: 'refuse',
        label: 'Ben je de afgelopen 8 jaar geweigerd of opgezegd door een verzekeraar? ' +
        'Of was je betrokken bij verzekeringsfraude? ',
        type: 'radio',
        formControl: this.formGroup.get('refuse'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          items: this.getBooleanItems()
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
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      driver: {
        formControlName: 'driver',
        label: 'Is jou, de regelmatige bestuurder of kentekenhouder de afgelopen 8 jaar de ' +
        'rijbevoegdheid (geheel of voorwaardelijk) ontzegd?',
        formControl: this.formGroup.get('driver'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      cause: {
        formControlName: 'cause',
        label: 'Heb je de afgelopen 5 jaar schade geleden of veroorzaakt, die gedekt werd door een ' +
        'soortgelijke verzekering als de verzekering die je nu aanvraagt?',
        formControl: this.formGroup.get('cause'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      register: {
        formControlName: 'register',
        label: 'Is de auto vanaf de datum dat deze op naam van de kentekenhouder staat, langer dan 10 dagen onverzekerd?',
        formControl: this.formGroup.get('register'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['cx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      }
    };
  }

  private getBooleanItems() {
    return [
      { label: 'Ja', value: true },
      { label: 'Nee', value: false }
    ];
  }
}