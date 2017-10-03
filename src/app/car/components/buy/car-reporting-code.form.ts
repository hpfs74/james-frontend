import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../../shared/forms/base-form';
import { nameInitialMask } from '../../../utils/base-form.utils';
import { numberValidator } from '../../../utils/base-form.validators';
import { carReportingCodeValidator } from '../../../utils/base-form.validators';
import { SecurityClasses } from '../../models/security-classes';

export class CarReportingCodeForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  securityClasses: Array<any>;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    reportingCode: () => 'Vul een geldige meldcode in (4 cijfers)'
  };

  constructor(private fb: FormBuilder) {
    super();

    this.infoMessages = {
      reportingCode: `
        <img class='image-reportingcode' src='/assets/images/reportingcode.png'>
        Elke auto heeft een eigen meldcode. Vraag je een verzekering aan, dan geef je altijd de meldcode op.
        De verzekeraar geeft dit door aan de RDW (Rijksdienst voor het Wegverkeer). De RDW houdt zo bij of alle
        auto's (tenminste WA) verzekerd zijn. Je vindt de meldcode van je auto op deel 1B van je kentekenbewijs.
        Het zijn de laatste 4 cijfers van het chassisnummer.`,
      accessory: `
        <p>Accessoires zijn bijvoorbeeld een alarminstallatie, een trekhaak, lichtmetalen velgen of een ingebouwde autoradio.</p>
        <p>Bij diefstal krijg je de dagwaarde terug van de verzekering.</p>`
    };

    this.securityClasses = SecurityClasses;

    this.formGroup = this.fb.group({
      reportingCode: [null,
        Validators.compose([
          Validators.required,
          carReportingCodeValidator('reportingCode')
        ])
      ],
      accessoryValue: [null,
        Validators.compose([
          Validators.required
        ])
      ],
      securityClass: [null, Validators.required],
      saveToProfile: [{}]
    });

    this.formConfig = {
      reportingCode: {
        formControlName: 'reportingCode',
        label: 'Meldcode',
        formControl: this.formGroup.get('reportingCode'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'number'
        }
      },
      accessoryValue: {
        formControlName: 'accessoryValue',
        label: 'Waarde accessoires',
        type: 'currency',
        formControl: this.formGroup.get('accessoryValue'),
        validationErrors: this.validationErrors
      },
      securityClass: {
        formControlName: 'securityClass',
        label: 'Hoe is je auto beveiligd?',
        type: 'select',
        formControl: this.formGroup.get('securityClass'),
        validationErrors: this.validationErrors,
        inputOptions: {
          items: this.securityClasses
            .map((i) => {
              return {
                label: i.short ? `${i.title} - ${i.short}` : i.title,
                value: i.value
              };
            })
        }
      },
      saveToProfile: {
        formControlName: 'saveToProfile',
        type: 'checkbox',
        formControl: this.formGroup.get('saveToProfile'),
        inputOptions: {
          items: [
            {
              label: 'Gegevens opslaan in mijn Knab Verzekeren profiel',
              value: 'true'
            }
          ]
        }
      }
    };
  }
}
