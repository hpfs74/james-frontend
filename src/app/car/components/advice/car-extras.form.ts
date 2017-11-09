import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UIPair } from '../../../core/models/ui-pair';

export class CarExtrasForm {
  formGroup: FormGroup;
  formConfig: any;

  constructor(
    private fb: FormBuilder,
    coverages?: Array<UIPair>,
    kmPerYear?: Array<UIPair>,
    legalAid?: Array<UIPair>,
    roadAssistance?: Array<UIPair>,
    ownRisk?: Array<UIPair>
  ) {

    const defaultOwnRisk = 135;

    this.formGroup = this.fb.group({
      coverage: ['', Validators.required],
      extraOptionsLegal: [{}],
      extraOptionsNoClaim: [{}],
      extraOptionsOccupants: [{}],
      roadAssistance: [null, Validators.required],
      ownRisk: [defaultOwnRisk, Validators.required],
      kmPerYear: [null, Validators.required]
    });

    this.formConfig = {
      coverage: {
        formControlName: 'coverage',
        type: 'radio',
        formControl: this.formGroup.get('coverage'),
        inputOptions: {
          items: coverages
        }
      },
      extraOptionsLegal: {
        formControlName: 'extraOptionsLegal',
        type: 'checkbox',
        formControl: this.formGroup.get('extraOptionsLegal'),
        inputOptions: {
          label: 'Rechtsbijstand',
          value: 'legal'
        } as UIPair
      },
      extraOptionsNoClaim: {
        formControlName: 'extraOptionsNoClaim',
        type: 'checkbox',
        formControl: this.formGroup.get('extraOptionsNoClaim'),
        inputOptions: {
          label: 'No-claimbeschermer',
          value: 'noclaim'
        } as UIPair
      },
      extraOptionsOccupants: {
        formControlName: 'extraOptionsOccupants',
        type: 'checkbox',
        formControl: this.formGroup.get('extraOptionsOccupants'),
        inputOptions: {
          label: 'Inzittendenverzekering',
          value: 'occupants'
        } as UIPair
      },
      roadAssistance: {
        formControlName: 'roadAssistance',
        type: 'select',
        formControl: this.formGroup.get('roadAssistance'),
        inputOptions: {
          items: roadAssistance
        }
      },
      ownRisk: {
        formControlName: 'ownRisk',
        type: 'select',
        formControl: this.formGroup.get('ownRisk'),
        inputOptions: {
          items: ownRisk
        }
      },

      kmPerYear: {
        formControlName: 'kmPerYear',
        type: 'select',
        formControl: this.formGroup.get('kmPerYear'),
        inputOptions: {
          items: kmPerYear
        }
      }
    };
  }
}
