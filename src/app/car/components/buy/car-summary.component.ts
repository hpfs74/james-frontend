import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { InsuranceAdvice } from '../../../insurance/models';
import { Profile } from '../../../profile/models';
import { Car, CarInsurance } from '../../../car/models';
import { ContentService } from '../../../content.service';

import * as FormUtils from '../../../utils/base-form.utils';
@Component({
  selector: 'knx-car-summary-form',
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent implements OnInit {
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
  securityClasses: Array<any>;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.securityClasses = this.contentService.getContentObject().car.securityClass;
  }

  getCoverage(coverage: string) {
    let value: string;

    switch (coverage) {
      case 'CL':
        value = 'Aansprakelijkheid';
        break;
      case 'CLC':
        value = 'Aansprakelijkheid + Beperkt casco';
        break;
      case 'CAR':
        value = 'Aansprakelijkheid + Volledig casco';
        break;
      default:
        break;
    }
    return value;
  }

  getSecurityClassName (securityClass: string) {
    return securityClass ? this.securityClasses.filter(item => item.value === securityClass)[0].title : '';
  }

  public isValidInsurance(obj: any) {
    return (obj &&
      !this.isEmpty(obj) &&
      !this.isEmpty(obj._embedded) &&
      !this.isEmpty(obj._embedded.car));
  }

  public isValidAdvice(obj: any) {
    return (obj &&
    !this.isEmpty(obj) &&
    !this.isEmpty(obj.address));
  }

  private isEmpty(obj: any) {
    return !obj || Object.keys(obj).length <= 0;
  }
}
