import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../forms/base-form';
import { futureDateValidator, ibanValidator } from '../utils/base-form.validators';
import { birthDateMask } from '../utils/base-form.utils';
import { carReportingCodeValidator } from '../utils/base-form.validators';

export class IbanForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    startDate: () => 'Vul een geldige startdatum in',
    iban: () => 'Vul een geldig bankrekeningnummer (IBAN) in',
    acceptConditions: () => `Je dient akkoord te gaan met de gebruiksvoorwaarden`
  };

  constructor(private fb: FormBuilder) {
    super();

    this.infoMessages = {
      startDate:
        `Je verzekering kan ingaan vanaf vandaag. Je kunt niet met terugwerkende kracht een verzekering afsluiten.
        Zorg ervoor dat de auto tenminste WA verzekerd is zodra die op jouw naam staat. Je loopt anders kans op een boete.`,
      iban:
        `Je vindt je IBAN meestal op je bankpas. Of kijk op een recent bankrekeningafschrift of in je bankieren app.`
    };

    this.formGroup = this.fb.group({
      startDate: [null,
        Validators.compose([
          Validators.required,
          futureDateValidator('startDate')
        ])
      ],
      iban: [null,
        Validators.compose([
          Validators.required,
          ibanValidator('iban')
        ])
      ],
      acceptConditions: [{}, Validators.required]
    });

    this.formConfig = {
      startDate: {
        formControlName: 'startDate',
        label: 'Ingangsdatum',
        type: 'date-input',
        formControl: this.formGroup.get('startDate'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'DD / MM / JJJJ',
          transform: birthDateMask.decode,
          textMask: birthDateMask
        }
      },
      iban: {
        formControlName: 'iban',
        label: 'Bankrekening (IBAN)',
        description: 'De premie wordt maandelijks automatisch afgeschreven',
        formControl: this.formGroup.get('iban'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'text'
        }
      },
      acceptConditions: {
        formControlName: 'acceptConditions',
        type: 'checkbox',
        formControl: this.formGroup.get('acceptConditions'),
        validationErrors: this.validationErrors,
        inputOptions: {
          items: [
            { label: 'Ik ga akkoord met de gebruiksvoorwaarden', value: 'true' }
          ]
        }
      }
    };
  }
}
