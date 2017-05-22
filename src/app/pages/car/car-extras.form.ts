import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export class CarExtrasForm {
  formGroup: FormGroup;
  formConfig: any;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      coverage: ['', Validators.required],
      extraOptions: [{}],
      ownRisk: [null],
      kmPerYear: [null]
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
      //{"min":[0,135],"15%":[135,110],"29%":[245,130],"43%":[375,125],"58%":[500,175],"72%":[675,275],"max":[950]}
      ownRisk: {
        formControlName: 'ownRisk',
        type: 'slider',
        formControl: this.formGroup.get('ownRisk'),
        inputOptions: {
          sliderOptions: {
            min: 0,
            max: 950,
            start: 0,
            range: this.getRangeConfig(ownRiskRanges),
            pips: {
              mode: 'steps',
              filter: (value, type) => { return ownRiskRanges.indexOf(value) > -1 ? 1 : 0; },
              density: 72
            }
          },
          throttle: 400
        }
      },
      roadAssistance: {
        formControlName: 'roadAssistance',
        type: 'radio',
        formControl: this.formGroup.get('roadAssistance'),
        inputOptions: {
            items: [
              {
                  label: 'Binnen Nederland',
                  value: 'RACO'
              },
              {
                  label: 'In Europa',
                  value: 'RAE'
              }
          ]
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

  private getRangeConfig(ranges: Array<number>) {
    let rangers = {};
    for (let i = 0; i < ranges.length; ++i) {
      var percentage = Math.ceil((100 / ranges.length) * i);
      if (i < ranges.length - 1) {
        if (i === 0) {
          rangers['min'] = [ranges[i], ranges[i + 1] - ranges[i]];
        } else {
          rangers[percentage + '%'] = [ranges[i], ranges[i + 1] - ranges[i]];
        }
      }
      if (i === ranges.length - 1) {
        rangers['max'] = [ranges[ranges.length - 1]];
      }
    }
    return rangers;
  }
}
