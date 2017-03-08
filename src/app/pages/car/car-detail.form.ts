import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CXFormGroupComponent } from '../../../../node_modules/@cx/form-group';

export class CarDetailForm {
  formGroup: FormGroup;
  formOptions: any = {};

  // @TODO: create validators

  constructor(private fb: FormBuilder, public config: any) {
    this.formGroup = this.fb.group({
      licensePlate: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
      birthDate: ['', Validators.required],
      postalCode: ['', Validators.compose(
        [Validators.required, Validators.maxLength(4)]
      )],
      houseNumber: ['', Validators.compose(
        [Validators.required, Validators.maxLength(15)]
      )],
      houseNumberExtension: ['', Validators.compose(
        [Validators.required, Validators.maxLength(15)]
      )],
      damageFreeYears: ['', Validators.required],
      kilometerPerYear: ['', Validators.required]
    });

    this.initFormOptions(config);
  }

  private initFormOptions(config: any): void {
    if (config && config.formControls) {
      for (let key in config.formControls) {
        let controlConfig = config.formControls[key];
        // find the accompanying FormControl ...
        controlConfig.formControl = this.formGroup.get(key);
        // .. and add it to the config options
        this.formOptions[key] = controlConfig;
      }
    }
  }
}
