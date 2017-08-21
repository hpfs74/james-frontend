import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export class CarExtrasForm {
  formGroup: FormGroup;
  formConfig: any;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      coverage: ['', Validators.required],
      extraOptions: [{}],
      roadAssistance: [null, Validators.required],
      ownRisk: [null, Validators.required],
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
              label: 'WA + Volledig Casco (All Risk)',
              value: 'CAR'
            }
          ]
        }
      },
      extraOptions: {
        formControlName: 'extraOptions',
        type: 'checkbox',
        formControl: this.formGroup.get('extraOptions'),
        inputOptions: {
          items: [
            {
              label: 'Rechtsbijstand',
              value: 'legal'
            },
            {
              label: 'No-claim beschermer',
              value: 'noclaim'
            },
            {
              label: 'Inzittenden verzekering',
              value: 'occupants'
            }
          ]
        }
      },
      roadAssistance: {
        formControlName: 'roadAssistance',
        type: 'select',
        formControl: this.formGroup.get('roadAssistance'),
        inputOptions: {
          items: [
            {
              label: 'Geen Pechhulp',
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
          items: [
            { label: '7.500 KM of minder', value: 'KMR1' },
            { label: '7.501 - 10.000', value: 'KMR2' },
            { label: '10.001 - 12.000', value: 'KMR3' },
            { label: '12.001 - 15.000', value: 'KMR4' },
            { label: '15.001 - 20.000', value: 'KMR5' },
            { label: '20.001 - 25.000', value: 'KMR6' },
            { label: '25.001 - 30.000', value: 'KMR7' },
            { label: '30.000 of meer', value: 'KMR8' }
          ]
        }
      }
    };
  }
}
