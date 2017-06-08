import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { CarReportingCodeForm } from './car-reporting-code.form';
import { Car, Profile } from '../../../models/';

@Component({
  selector: 'knx-car-reporting-code-form',
  templateUrl: 'car-reporting-code.component.html'
})

export class CarReportingCodeComponent implements OnChanges {
  @Input() form: CarReportingCodeForm;
  @Input() profile: Profile;

  ngOnChanges(changes: SimpleChanges) {
    //if (this.profile && this.profile.car)
  }
}
