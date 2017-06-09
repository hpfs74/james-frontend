import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';

import { CarReportingCodeForm } from './car-reporting-code.form';
import { Car, Profile } from '../../../models/';
import { CarSecurityClass, carSecurityClasses } from '../../../models/car-security-class';

@Component({
  selector: 'knx-car-reporting-code-form',
  templateUrl: 'car-reporting-code.component.html'
})
export class CarReportingCodeComponent implements OnInit, OnChanges {
  @Input() form: CarReportingCodeForm;
  @Input() profile: Profile;

  securityClasses = carSecurityClasses;
  selectedSecurityClass: CarSecurityClass;

  ngOnInit() {
    this.form.formGroup.get('securityClass').valueChanges.subscribe((value) => {
      this.selectedSecurityClass = this.securityClasses.filter(i => i.value === value)[0];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    //if (this.profile && this.profile.car)
  }
}
