import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../models/base-form';
import { dateValidator } from '../utils/base-form.validators';
import { carReportingCodeValidator } from '../utils/base-form.validators';

export class IbanForm extends BaseForm {
  formGroup: FormGroup;
  formConfig: any;

  public validationErrors = {
    required: () => 'Dit veld is verplicht',
    startDate: () => 'Vul een geldige startdatum in',
    iban: () => 'Vul een geldig bankrekeningnummer (IBAN) in'
  };

  constructor(private fb: FormBuilder) {
    super();

    this.infoMessages = {
      startDate:
        `Je verzekering kan ingaan vanaf vandaag. Je kunt niet met terugwerkenze kracht een verzekering afsluiten.
        Zorg ervoor dat de auto tenminste WA verzekerd is zodra die op jouw naam staat. Je loopt anders kans op een boete.`,
      iban:
        `Je vindt je IBAN meestal op je bankpas. Of kijk op een recent bankrekeningafschrift of in je bankieren app.`
    };

    this.formGroup = this.fb.group({
      startDate: [null,
        Validators.compose([
          Validators.required,
          dateValidator('startDate')
        ])
      ],
      iban: [null,
        Validators.compose([
          Validators.required
          //TODO: add ibanValidator
        ])
      ],
      acceptConditions: [{}]
    });

    this.formConfig = {
      startDate: {
        formControlName: 'startDate',
        label: 'Ingangsdatum',
        formControl: this.formGroup.get('startDate'),
        validationErrors: this.validationErrors,
        inputOptions: {
          type: 'text'
        }
      },
      iban: {
        formControlName: 'iban',
        label: 'Bankrekening (IBAN)',
        type: 'text',
        formControl: this.formGroup.get('iban'),
        validationErrors: this.validationErrors
      },
      acceptConditions: {
        formControlName: 'acceptConditions',
        type: 'checkbox',
        description: 'De premie wordt maandelijks automatisch afgeschreven',
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
