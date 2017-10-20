import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { InsuranceAdvice } from '../../../insurance/models';
import { Profile } from '../../../profile/models';
import { Car, CarInsurance } from '../../../car/models';
import { CarUtils } from '../../utils/car-utils';

import * as FormUtils from '../../../utils/base-form.utils';
@Component({
  selector: 'knx-car-summary-form',
  styleUrls: ['./car-summary.component.scss'],
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent {
  @Output() confirmChange = new EventEmitter();

  @Input()
  get confirm() {
    return this.confirmValue;
  }

  set confirm(val) {
    this.confirmValue = val;
    this.confirmChange.emit(this.confirmValue);
  }

  @Input() profile: Profile;
  @Input() insurance: CarInsurance;
  @Input() advice: any; // user data from form steps

  confirmValue: boolean;

  carUtils = CarUtils;

  isValidInsurance(obj: any) {
    return (obj &&
      !this.isEmpty(obj) &&
      !this.isEmpty(obj._embedded) &&
      !this.isEmpty(obj._embedded.car));
  }

  isValidAdvice(obj: any) {
    return (obj &&
    !this.isEmpty(obj) &&
    !this.isEmpty(obj.address));
  }

  isEmpty(obj: any) {
    return !obj || Object.keys(obj).length <= 0;
  }
}
