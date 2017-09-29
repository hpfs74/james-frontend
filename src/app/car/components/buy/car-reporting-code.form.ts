import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BaseForm } from '../../../shared/forms/base-form';
import { nameInitialMask } from '../../../utils/base-form.utils';
import { numberValidator } from '../../../utils/base-form.validators';
import { carReportingCodeValidator } from '../../../utils/base-form.validators';

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

    /* tslint:disable */
    this.securityClasses = [
      {
        value: 'SCM_NONE',
        title: 'Weet ik niet / Geen',
        description: 'Ik weet niet welke klasse alarmsysteem ik heb. Of ik heb geen alarmsysteem.'
      },
      {
        value: 'SCM1',
        title: 'Klasse 1',
        short: 'Standaard alarmsysteem',
        description: 'Sinds 1998 hebben auto\'s minimaal een klasse 1 beveiliging. Dat betekent dat de auto een startonderbreking heeft die de startmotor en brandstofvoorziening blokkeert.'
      },
      {
        value: 'SCM2',
        title: 'Klasse 2',
        short: 'Alarmsysteem met startonderbreker',
        description: 'Alarmsysteem met startonderbreker. De auto heeft startonderbreking. En wordt er gerommeld aan je auto? Dan gaat je alarm af en je lichten gaan knipperen.'
      },
      {
        value: 'SCM3',
        title: 'Klasse 3',
        short: 'Uitgebreid met hellingdetectie',
        description: 'De auto heeft startonderbreking met alarm. Klasse 3 heeft ook hellingdetectie: het alarm gaat af zodra je auto wordt opgetild.'
      },
      {
        value: 'SCM4',
        title: 'Klasse 4',
        short: 'Uitgebreid met voertuigvolgsysteem',
        description: 'De auto heeft startonderbreking met alarm. Het alarm gaat ook af als je auto wordt opgetild. Klasse 4 heeft een voertuigvolgsysteem dat de positie van je auto doorgeeft als de auto beweegt of als jij diefstal meldt.'
      },
      {
        value: 'SCM5',
        title: 'Klasse 5',
        short: 'Uitgebreid met voertuigvolgsysteem dat direct in werking gaat',
        description: 'Uitgebreid met voertuigvolgsysteem dat direct in werking gaat De auto heeft startonderbreking met alarm. Het alarm gaat ook af als je auto wordt opgetild. Klasse 5 heeft een voertuigvolgsysteem dat direct aangaat als het alarm afgaat.'
      }
    ];
    /* tslint:enable */

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
