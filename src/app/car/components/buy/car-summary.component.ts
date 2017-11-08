import { Component, Input, Output, EventEmitter } from '@angular/core';

import { QaIdentifier } from './../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../shared/models/qa-identifiers';

import { Profile } from '../../../profile/models';
import { Car, CarInsurance } from '../../../car/models';

@Component({
  selector: 'knx-car-summary-form',
  styleUrls: ['./car-summary.component.scss'],
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent implements QaIdentifier {
  qaRootId = QaIdentifiers.carSummary;

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
