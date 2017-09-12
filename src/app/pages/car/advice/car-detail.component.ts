import {
  Component, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter, AfterViewChecked
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import * as fromRoot from '../../../reducers';
import * as car from '../../../actions/car';

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
export class CarDetailComponent implements OnInit, AfterViewChecked {
  @Input() form: CarDetailForm;
  @Input() car: Car;
  @Input() userProfile: any;
  @Input() config: any;
  @Input() coverages: Price[];
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
        gender: value.gender ? value.gender.toLowerCase() : null,
        coverage: value.coverage || null,
      }));

      // textmask decode doesn't work correctly with patchValue, so use setValue on control instead
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
  // @Output() licensePlateChange: EventEmitter<string> = new EventEmitter();
  @Output() coverageDetailsChange: EventEmitter<any> = new EventEmitter();
  @Output() addressChange: EventEmitter<Address> = new EventEmitter();
  @Output() coverageSelected: EventEmitter<Price> = new EventEmitter();
  @Output() formControlFocus: EventEmitter<string> = new EventEmitter();

  constructor(private store$: Store<fromRoot.State>) { }

  ngAfterViewChecked() {
    let licenseControl = this.form.formGroup.get('licensePlate');
    licenseControl.setAsyncValidators((formControl) => this.validateLicenseAsync(formControl));
  }

  ngOnInit() {
    const ONCHANGE_THROTTLE = 1000;
    const licensePlate = this.form.formGroup.get('licensePlate');
    const loan = this.form.formGroup.get('loan');

    Observable.combineLatest(
      licensePlate.valueChanges,
      loan.valueChanges)
      .distinctUntilChanged()
      .throttleTime(ONCHANGE_THROTTLE)
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
    // so we use length here to determine when to proceed
    if (licensePlate && licensePlate.length === validLength) {
      this.store$.dispatch(new car.GetInfoAction(licensePlate));
    }
  }

  onAddressFound(event: Address) {
    this.addressChange.emit(event);
  }

  // thomas-g: this dependency on store here is unwanted because this
  // should be a dumb component that only has inputs and outputs, but because we
  // don't have forms integrated with the store, async validation is done here using
  // the store state for now
  validateLicenseAsync(licenseControl: AbstractControl): Observable<any> {
    const debounceTime = 500;

    return Observable.timer(debounceTime).switchMap(() => {
      const validLength = 6;

      const license = licenseControl.value;

      if (!license || license.length !== validLength) {
        return new Observable(obs => obs.next(null));
      }

      const error = { licensePlateRDC: true };
      return this.store$.select(fromRoot.getCarInfo)
        .map((car) => {
          if (car && car.license) {
            return null;
          } else {
            return error;
          }
        }, err => {
          return error;
        });

    });
  }
}
