import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { KilometersPerYear } from '../../models/kilometers';

export class CarExtrasForm {
  formGroup: FormGroup;
  formConfig: any;

  constructor(private fb: FormBuilder) {

    this.formGroup = this.fb.group({
      coverage: ['', Validators.required],
      extraOptionsLegal: [{}],
      extraOptionsNoClaim: [{}],
      extraOptionsOccupants: [{}],
      roadAssistance: [null, Validators.required],
      ownRisk: [135, Validators.required],
      kmPerYear: [null, Validators.required]
    });

    const ownRiskRanges: Array<number> = [0, 135, 245, 375, 500, 675, 950];

    this.formConfig = {
      coverage: {
        formControlName: 'coverage',
        type: 'radio',
        formControl: this.formGroup.get('coverage'),
        inputOptions: {
          items: [
            {
              label: 'WA',
              value: 'CL'
            },
            {
              label: 'WA + Beperkt Casco',
              value: 'CLC'
            },
            {
              label: 'WA + Volledig Casco (Allrisk)',
              value: 'CAR'
            }
          ]
        }
      },
      extraOptionsLegal: {
        formControlName: 'extraOptionsLegal',
        type: 'checkbox',
        formControl: this.formGroup.get('extraOptionsLegal'),
        inputOptions: { label: 'Rechtsbijstand', value: 'legal'}
      },
      extraOptionsNoClaim: {
        formControlName: 'extraOptionsNoClaim',
        type: 'checkbox',
        formControl: this.formGroup.get('extraOptionsNoClaim'),
        inputOptions: { label: 'No-claimbeschermer',
          value: 'noclaim'}
      },
      extraOptionsOccupants: {
        formControlName: 'extraOptionsOccupants',
        type: 'checkbox',
        formControl: this.formGroup.get('extraOptionsOccupants'),
        inputOptions: {
          label: 'Inzittendenverzekering',
          value: 'occupants'
        }
      },
      roadAssistance: {
        formControlName: 'roadAssistance',
        type: 'select',
        formControl: this.formGroup.get('roadAssistance'),
        inputOptions: {
          items: [
            {
              label: 'Geen pechhulp',
              value: 'RANO'
            },
            {
              label: 'Binnen Nederland',
              value: 'RACO'
            },
            {
              label: 'Binnen Europa',
              value: 'RAE'
            }
          ]
        }
      },
      ownRisk: {
        formControlName: 'ownRisk',
        type: 'select',
        formControl: this.formGroup.get('ownRisk'),
        inputOptions: {
          items: ownRiskRanges.map((v) => {
            return {
              label: '€ ' + v,
              value: v
            };
          })
        }
      },

      kmPerYear: {
        formControlName: 'kmPerYear',
        type: 'select',
        formControl: this.formGroup.get('kmPerYear'),
        inputOptions: {
          items: KilometersPerYear
        }
      }
    };
  }
}
