import {
  Component, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import * as fromRoot from '../../../reducers';
import * as car from '../../actions/car';

import { CarDetailForm } from './car-detail.form';
import { Car, CarCoverageRecommendation } from '../../models';
import { Price } from '../../../shared/models';
import { Address } from '../../../profile/models';
import { CarService } from '../../services/car.service';
import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-detail-form',
  styleUrls: ['car-detail.component.scss'],
  templateUrl: 'car-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetailComponent implements OnInit {
  @Input() form: CarDetailForm;
  @Input() car: Car;
  @Input() userProfile: any;
  @Input() config: any;
  @Input() coverages: Price[];
  @Input() coverageRecommendation: CarCoverageRecommendation;
  @Input() isCoverageLoading: boolean;
  @Input() isCoverageError: boolean;

  @Input() set advice(value: any) {
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

      let dob = new Date(value.date_of_birth);
      this.form.formGroup.get('birthDate').setValue(
        value.date_of_birth ? `${dob.getDate()} / ${dob.getMonth() + 1} / ${dob.getFullYear()}` : null
      );

      this.form.addressForm.patchValue(Object.assign({}, {
        postalCode: value.address ? value.address.postcode : null,
        houseNumber: value.address ? FormUtils.getNumbers(value.address.number) : null,
        houseNumberExtension: value.number_extended ? value.number_extended.number_addition : null
      }));

      // give address-lookup component time to set AsyncValidators before validate it
      setTimeout(() => {
        FormUtils.updateAndValidateControls(this.form.formGroup, value);
        FormUtils.updateAndValidateControls(this.form.addressForm, value);
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
}
