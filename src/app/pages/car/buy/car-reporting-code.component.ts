import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { CarReportingCodeForm } from './car-reporting-code.form';
import { Car, Profile } from '../../../models/';
import { CarSecurityClass } from '../../../content.interface';
import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-reporting-code-form',
  templateUrl: 'car-reporting-code.component.html'
})
export class CarReportingCodeComponent implements OnInit {
  @Input() form: CarReportingCodeForm;
  @Input() profile: Profile;
  @Input() set advice(value: any) {
    if (value) {
      FormUtils.updateAndValidateControls(this.form.formGroup, value);
    }
  }

  selectedSecurityClass: CarSecurityClass;

  ngOnInit() {
    this.form.formGroup.get('securityClass').valueChanges.subscribe((value) => {
      this.selectedSecurityClass = this.form.securityClasses.filter(i => i.value === value)[0];
    });
  }
}
