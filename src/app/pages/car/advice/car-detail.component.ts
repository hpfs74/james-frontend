import {
  Component, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { CarDetailForm } from './car-detail.form';
import { Car, Price, Address } from '../../../models';
import { CarService } from '../car.service';
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
  @Input() isCoverageLoading: boolean;

  @Input() set advice(value: any) {
    if (value.licensePlate || value.birthDate || value.claimFreeYears || value.houseHold || value.loan || value.gender || value.coverage) {
      this.form.formGroup.patchValue(Object.assign({}, {
        licensePlate: value.license || null,
        claimFreeYears: value.claim_free_years || null,
        houseHold: value.household_status || null,
        loan: !!value.active_loan,
        gender: value.gender ? value.gender.toLowerCase() : null,
        coverage: value.coverage || null,
      }));

      // textmask decode doesn't work correctly with patchValue, so use setValue on control instead
      this.form.formGroup.get('birthDate').setValue = value.date_of_birth ? value.date_of_birth : null;

      this.form.addressForm.patchValue(Object.assign({}, {
        postalCode: value.address ? value.address.postcode : null,
        houseNumber: value.address ? value.address.number : null,
        houseNumberExtension: value.number_extended ? value.number_extended.number_addition : null
      }));
      FormUtils.updateAndValidateControls(this.form.formGroup, value);
      FormUtils.updateAndValidateControls(this.form.addressForm, value);
    }
  }

  @Output() licensePlateChange: EventEmitter<string> = new EventEmitter();
  @Output() coverageDetailsChange: EventEmitter<any> = new EventEmitter();
  @Output() addressChange: EventEmitter<Address> = new EventEmitter();
  @Output() coverageSelected: EventEmitter<Price> = new EventEmitter();
  @Output() formControlFocus: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private carService: CarService) {
  }

  ngOnInit() {
    const licensePlate = this.form.formGroup.get('licensePlate');
    const loan = this.form.formGroup.get('loan');

    Observable.combineLatest(
      licensePlate.valueChanges,
      loan.valueChanges)
      .distinctUntilChanged()
      .subscribe(data => {
        if (licensePlate.valid && loan.valid) {
          this.coverageDetailsChange.emit(this.form.formGroup.value);
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
    // so we use length here to determine validity
    if (licensePlate && licensePlate.length === validLength) {
      this.licensePlateChange.emit(licensePlate);
    }
  }

  onAddressFound(event: Address) {
    this.addressChange.emit(event);
  }
}
