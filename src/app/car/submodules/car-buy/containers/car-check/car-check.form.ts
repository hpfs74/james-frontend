import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm, KNXCustomFormGroupOptions } from '@app/shared/forms/base-form';

export class CarCheckForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: { [key: string]: KNXCustomFormGroupOptions<any> };

  public validationErrors = {
    required: () => 'Dit is een verplicht veld'
  };

  constructor( private fb: FormBuilder ) {
    super();

    this.formGroup = this.fb.group({
      crime: [null, Validators.required],
      crimeComment: [null],
      debt: [null, Validators.required],
      debtComment: [null],
      refuse: [null, Validators.required],
      refuseComment: [null],
      driver: [null, Validators.required],
      driverComment: [null],
      cause: [null, Validators.required],
      causeComment: [null],
      register: [null, Validators.required],
      registerComment: [null]
    });

    this.formConfig = {
      crime: {
        formControlName: 'crime',
        label: 'Ben je de afgelopen 8 jaar in aanraking geweest met politie of justitie?',
        type: 'radio',
        formControl: this.formGroup.get('crime'),
        validationErrors: this.validationErrors,
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      crimeComment: {
        formControlName: 'crimeComment',
        type: 'textarea',
        formControl: this.formGroup.get('crimeComment'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Waar ging dat om?'
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
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      refuseComment: {
        formControlName: 'refuseComment',
        type: 'textarea',
        formControl: this.formGroup.get('refuseComment'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Waar ging dat om?'
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
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      debtComment: {
        formControlName: 'debtComment',
        type: 'textarea',
        formControl: this.formGroup.get('debtComment'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Waar ging dat om?'
        }
      },
      driver: {
        formControlName: 'driver',
        label: 'Is jou, de regelmatige bestuurder en kentekenhouder in de laatste 8 jaar de ' +
        'rijbevoegdheid (geheel of voorwaardelijk) ontzegd?',
        formControl: this.formGroup.get('driver'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      driverComment: {
        formControlName: 'driverComment',
        type: 'textarea',
        formControl: this.formGroup.get('driverComment'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Waar ging dat om?'
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
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      causeComment: {
        formControlName: 'causeComment',
        type: 'textarea',
        formControl: this.formGroup.get('causeComment'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Waar ging dat om?'
        }
      },
      register: {
        formControlName: 'register',
        label: 'Is de auto vanaf de datum dat deze op naam van de kentekenhouder staat, langer dan 10 dagen onverzekerd?',
        formControl: this.formGroup.get('register'),
        validationErrors: this.validationErrors,
        type: 'radio',
        inputOptions: {
          formGroupModifiers: ['knx-form-group__wrap--spread'],
          items: this.getBooleanItems()
        }
      },
      registerComment: {
        formControlName: 'registerComment',
        type: 'textarea',
        formControl: this.formGroup.get('registerComment'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Waar ging dat om?'
        }
      },
    };
  }

  private getBooleanItems() {
    return [
      { label: 'Ja', value: true },
      { label: 'Nee', value: false }
    ];
  }
}
