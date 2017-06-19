import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';

import { CarCheckForm } from './car-check.form';
import { Car, Profile, CarSecurityClass } from '../../../models/';

@Component({
  selector: 'knx-car-check',
  templateUrl: 'car-check.component.html'
})
export class CarCheckComponent implements OnInit, OnChanges {
  @Input() form: CarCheckForm;

  selectedSecurityClass: CarSecurityClass;

  ngOnInit() {
    // this.form.formGroup.get('securityClass').valueChanges.subscribe((value) => {
    //   this.selectedSecurityClass = this.form.securityClasses.filter(i => i.value === value)[0];
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    //if (this.profile && this.profile.car)
  }
}
