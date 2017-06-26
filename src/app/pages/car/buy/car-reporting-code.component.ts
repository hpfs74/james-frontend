import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';

import { CarReportingCodeForm } from './car-reporting-code.form';
import { Car, Profile } from '../../../models/';
import { CarSecurityClass } from '../../../content.interface';

@Component({
  selector: 'knx-car-reporting-code-form',
  templateUrl: 'car-reporting-code.component.html'
})
export class CarReportingCodeComponent implements OnInit, OnChanges {
  @Input() form: CarReportingCodeForm;
  @Input() profile: Profile;

  selectedSecurityClass: CarSecurityClass;

  ngOnInit() {
    this.form.formGroup.get('securityClass').valueChanges.subscribe((value) => {
      this.selectedSecurityClass = this.form.securityClasses.filter(i => i.value === value)[0];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    //TODO: determine how/where to store the car details in the NICCI profile
    //if (this.profile && this.profile.car)
  }
}
