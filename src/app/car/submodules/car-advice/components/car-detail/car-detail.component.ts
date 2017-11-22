import {
  Component, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TagsService } from '../../../../../core/services/tags.service';
import 'rxjs/add/observable/combineLatest';
import * as cuid from 'cuid';

import * as car from '../../../../actions/car';
import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromCore from '../../../../../core/reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromCar from '../../../../reducers';
import * as fromAddress from '../../../../../address/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';
import * as coverage from '../../../../actions/coverage';
import * as compare from '../../../../actions/compare';
import * as router from '../../../../../core/actions/router';

import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';

import { CarDetailForm } from './car-detail.form';
import { AddressForm } from '../../../../../address/components/address.form';
import { Car, CarCoverageRecommendation, CarInsurance, CarCompare } from '../../../../models';
import { Price } from '../../../../../shared/models';
import { Address } from '../../../../../address/models';
import { CarService } from '../../../../services/car.service';
import * as FormUtils from '../../../../../utils/base-form.utils';
import { createCarCoverages } from '../../../../utils/coverage.utils';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
import { AfterContentChecked } from '@angular/core/src/metadata/lifecycle_hooks';
declare var window: any;
@Component({
  selector: 'knx-car-detail-form',
  styleUrls: ['./car-detail.component.scss'],
  templateUrl: 'car-detail.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetailComponent implements OnInit, QaIdentifier, KNXStepRxComponent, AfterContentChecked {
  qaRootId = QaIdentifiers.carDetails;
  form: CarDetailForm;
  addressForm: AddressForm;
  coverages: Price[];
  address$: Observable<Address>;
  car$: Observable<Car>;
  isCarLoading$: Observable<boolean>;
  isCarFailed$: Observable<boolean>;
  advice$: Observable<any>;
  insurances$: Observable<Array<CarInsurance>>;
  isInsuranceLoading$: Observable<boolean>;
  selectedInsurance$: Observable<CarInsurance>;
  isCoverageLoading$: Observable<boolean>;
  isCoverageError$: Observable<boolean>;
  coverageRecommendation$: Observable<CarCoverageRecommendation>;
  isLoggedIn$: Observable<boolean>;
  purchasedInsurances$: Observable<any>;
  purchasedInsurancesLoading$: Observable<any>;

  @Output() licensePlateInvalid: EventEmitter<string> = new EventEmitter();
  @Output() licensePlateChange: EventEmitter<string> = new EventEmitter();
  @Output() activeLoanChange: EventEmitter<boolean> = new EventEmitter();

  @Output() addressChange: EventEmitter<Address> = new EventEmitter();
  @Output() coverageSelected: EventEmitter<Price> = new EventEmitter();
  @Output() formControlFocus: EventEmitter<string> = new EventEmitter();

  constructor(private store$: Store<fromRoot.State>, private tagsService: TagsService) {
    this.address$ = this.store$.select(fromAddress.getAddress);
    this.car$ = this.store$.select(fromCar.getCarInfo);
    this.isCarLoading$ = this.store$.select(fromCar.getCarInfoLoading);
    this.isCarFailed$ = this.store$.select(fromCar.getCarInfoError);
    // this.insurances$ = this.getCompareResultCopy();
    this.isInsuranceLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.isCoverageError$ = this.store$.select(fromCar.getCompareError);
    this.isCoverageLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.coverageRecommendation$ = this.store$.select(fromCar.getCoverage);
    this.isLoggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.purchasedInsurances$ = this.store$.select(fromInsurance.getPurchasedInsurance);
    this.purchasedInsurancesLoading$ = this.store$.select(fromInsurance.getPurchasedInsuranceLoading);
    const formBuilder = new FormBuilder();
    this.addressForm = new AddressForm(formBuilder);
    window.details = this;
    this.form = new CarDetailForm(formBuilder,
      this.tagsService.getAsLabelValue('insurance_flow_household'));
    this.coverages = createCarCoverages(this.tagsService.getByKey('car_flow_coverage'));
  }

  ngAfterContentChecked() {
    let licenseControl = this.form.formGroup.get('licensePlate');
    licenseControl.setAsyncValidators((formControl) => this.validateLicenseAsync(formControl));
  }

  ngOnInit() {
    const loan = this.form.formGroup.get('loan');
    loan.valueChanges.subscribe((value) => {
      if (value !== null && loan.valid) {
        this.store$.dispatch(new coverage.CarCoverageSetActiveLoan(value));
      }
    });
    // Subscribe to car errors
    this.store$.select(fromCar.getCarInfoError)
    .subscribe((error) => {
      if (error) {
        this.form.formGroup.get('licensePlate').updateValueAndValidity();
        this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.error.carNotFound', clear: true}));
      }
    });

    // Subscribe to car info
    this.store$.select(fromCar.getCarInfo)
      .subscribe((car: Car) => {
        if (car && car.license) {
          this.form.formGroup.get('licensePlate').updateValueAndValidity();
          this.store$.dispatch(new assistant.AddCannedMessage({
            key: 'car.info.niceCar',
            value: car,
            clear: true
          }));
        }
      });

    // Subscribe to coverage recommendation request
    this.store$.select(fromCar.getCoverage)
      .filter(coverage => coverage !== null)
      .subscribe(coverageAdvice => {
        this.coverages.forEach( item => { item.selected = false; });
        let coverageItem = this.coverages.filter(item => item.id === coverageAdvice.recommended_value)[0];
        if (coverageItem) {
          this.store$.dispatch(new assistant.AddCannedMessage({
            key: 'car.info.coverage.advice',
            value: coverageItem,
            clear: true
          }));

          coverageItem.selected = true;
          this.updateSelectedCoverage(coverageItem);
        }
      });
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.welcome', clear: true}));
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

  validateLicenseAsync(licenseControl: AbstractControl): Observable<any> {
    const debounceTime = 500;

    return Observable.timer(debounceTime).switchMap(() => {
      const validLength = 6;
      const license = licenseControl.value;

      if (!license || license.length !== validLength) {
        return new Observable(obs => obs.next(null));
      }

      const error = {licensePlateRDC: true};
      return this.store$.select(fromCar.getCarInfo)
        .map((car) => {
            if (car && car.license) {
              return null;
            } else {
              return error;
            }
          }, err => error
        );
    });
  }

  updateSelectedCoverage(coverage: Price) {
    this.form.formGroup.get('coverage').patchValue(coverage.id);
    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'car.info.' + coverage.id,
      clear: true
    }));
  }

  setAdvice(value: any) {

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

      setTimeout(() => {
        FormUtils.updateAndValidateControls(this.form.formGroup, value);
        FormUtils.updateAndValidateControls(this.addressForm.formGroup, value);
      });
    }
  }

  nextStep(): Observable<any> {
    const detailForm = this.form.formGroup;
    const addressForm = this.addressForm.formGroup;
    FormUtils.validateForm(detailForm);
    // FormUtils.validateForm(addressForm);

    if (!detailForm.valid || !addressForm.valid) {
      return Observable.throw(new Error(this.form.validationSummaryError));
    }

    Observable.combineLatest(this.car$, this.address$, (car, address) => {
      return {
        request: {
          active_loan: !!detailForm.value.loan,
          coverage: detailForm.value.coverage,
          claim_free_years: +detailForm.value.claimFreeYears,
          household_status: detailForm.value.houseHold,
          license: car.license,
          gender: detailForm.value.gender.toUpperCase(),
          title: detailForm.value.gender === 'M' ? 'Dhr.' : 'Mw.',
          date_of_birth: FormUtils.toNicciDate(FormUtils.isMaskFormatted(detailForm.value.birthDate) ?
            FormUtils.dateDecode(detailForm.value.birthDate) : detailForm.value.birthDate),
          zipcode: address.postcode,
          house_number: address.number,
          city: address.city,
          country: 'NL',
          kilometers_per_year: detailForm.value.kmPerYear || 'KMR3',
          own_risk: detailForm.value.ownRisk === null || detailForm.value.ownRisk === undefined ? 135 : +detailForm.value.ownRisk,
          cover_occupants: false,
          legal_aid: 'LAN',
          no_claim_protection: false,
          road_assistance: 'RANO',
          insurance_id: ''
        } as CarCompare,
        address: address
      };
    })
      .take(1)
      .subscribe((compare) => {
        // add address in format for profile
        // TODO: is this really needed?
        this.store$.dispatch(new advice.UpdateAction(Object.assign({}, compare.request, {
          address: compare.address
        })));
      });
    this.store$.select(fromInsurance.getSelectedAdvice)
      .filter(advice => advice !== undefined && Object.keys(advice).length > 1) // bit hackisch way to check for valid compare request
      .map(advice => this.store$.dispatch(new compare.LoadCarAction(advice)))
      .catch(error => Observable.throw(error));
    return Observable.of(true); // for now return true, used to navigate to next step
  }

  onBack(): Observable<any> {
    return Observable.of(this.store$.dispatch(new router.Back()));
  }

  onNext(): Observable<any> {
    return this.nextStep();
  }

  onShow(): Observable<any> {
    // console.log('show');
    return;
  }

}
