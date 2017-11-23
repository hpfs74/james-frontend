import {
  Component, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import * as fromRoot from '../../reducers';
import * as car from '../actions/car';

import { QaIdentifier } from './../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../shared/models/qa-identifiers';

import { CarDetailForm } from './car-detail.form';
import { AddressForm } from '../../address/components/address.form';
import { Car, CarCoverageRecommendation } from '../models';
import { Price } from '../../shared/models';
import { Address } from '../../address/models';
import { CarService } from '../services/car.service';
import * as FormUtils from '../../utils/base-form.utils';

@Component({
  selector: 'knx-car-detail-form',
  styleUrls: ['./car-detail.component.scss'],
  templateUrl: 'car-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetailComponent implements OnInit, QaIdentifier {
  qaRootId = QaIdentifiers.carDetails;

  @Input() form: CarDetailForm;
  @Input() addressForm: AddressForm;
  @Input() car: Car;
  @Input() carLoading: boolean;
  @Input() carFailed: boolean;
  @Input() userProfile: any;
  @Input() config: any;
  @Input() coverages: Price[];
  @Input() coverageRecommendation: CarCoverageRecommendation;
  @Input() isCoverageLoading: boolean;
  @Input() isCoverageError: boolean;

  @Input()
  set advice(value: any) {

    if (value.address) {
      this.addressForm.formGroup.patchValue(Object.assign({}, {
        postalCode: value.address ? value.address.postcode : null,
        houseNumber: this.normalizeAddressHouseNumber(value),
        houseNumberExtension: this.normalizeAddressHouseNumberAddition(value)
      }));
    }

    if (value.licensePlate || value.birthDate || value.claimFreeYears || value.houseHold ||
      value.coverage || value.gender || value.active_loan) {
      this.form.formGroup.patchValue(Object.assign({}, {
        licensePlate: value.license || null,
        claimFreeYears: value.claim_free_years || null,
        houseHold: value.household_status || null,
        loan: !!value.active_loan,
        gender: value.gender ? value.gender : null,
        coverage: value.coverage || null,
      }));

      if (value.date_of_birth) {
        let dob = new Date(value.date_of_birth);
        this.form.formGroup.get('birthDate').setValue(
          value.date_of_birth ? `${dob.getDate()} / ${dob.getMonth() + 1} / ${dob.getFullYear()}` : null
        );
      }

      // give address-lookup component time to set AsyncValidators before validate it
      setTimeout(() => {
        FormUtils.updateAndValidateControls(this.form.formGroup, value);
        FormUtils.updateAndValidateControls(this.addressForm.formGroup, value);
      });
    }
  }

  @Output() licensePlateInvalid: EventEmitter<string> = new EventEmitter();
  @Output() licensePlateChange: EventEmitter<string> = new EventEmitter();
  @Output() activeLoanChange: EventEmitter<boolean> = new EventEmitter();

  @Output() addressChange: EventEmitter<Address> = new EventEmitter();
  @Output() coverageSelected: EventEmitter<Price> = new EventEmitter();
  @Output() formControlFocus: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    const loan = this.form.formGroup.get('loan');
    loan.valueChanges.subscribe((value) => {
      if (value !== null && loan.valid) {
        this.activeLoanChange.emit(value);
      }
    });
  }

  onFocus(controlKey) {
    this.formControlFocus.emit(controlKey);
  }

  onFocusHouseHold() {
    this.formControlFocus.emit('houseHold');
  }

  onSelectCoverage(coverage: Price) {
    if (coverage.id) {
      this.coverageSelected.emit(coverage);
    }
  }

  onLicensePlateChange(licensePlate: string) {
    const validLength = 6;
    // control valid state is changed externally based on RDC request result,
    // so we use length here to determine when to proceed
    if (licensePlate && licensePlate.length === validLength) {
      this.licensePlateChange.emit(licensePlate);
    }
  }

  onAddressFound(event: Address) {
    this.addressChange.emit(event);
  }

  private normalizeAddressHouseNumber(payload: any) {
    if (!payload.address) {
      return null;
    }

    let number = payload.address.number;
    if (number !== null && number !== '') {
      if (typeof(number) === 'string' && number.indexOf(',') !== -1) {
        return number.split(',')[0];
      }

      if (typeof(number) === 'string' && number.indexOf('-') !== -1) {
        return number.split('-')[0];
      }
    }
    return FormUtils.getNumbers(number);
  }

  private normalizeAddressHouseNumberAddition(payload: any) {
    if (!payload.address) {
      return null;
    }
    let number = payload.address.number;
    if (number !== null && number !== '') {
      if (typeof(number) === 'string' && number.indexOf(',') !== -1) {
        return '-' + number.split(',')[1];
      }

      if (typeof(number) === 'string' && number.indexOf('-') !== -1) {
        return '-' + number.split('-')[1];
      }
    }
    return payload.number_extended ? payload.number_extended.number_addition : null;
  }

}
