import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TagsService } from '../../../../../core/services/tags.service';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as cuid from 'cuid';
import * as car from '../../../../actions/car';
import * as fromRoot from '../../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromCar from '../../../../reducers';
import * as fromAddress from '../../../../../address/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';
import * as coverage from '../../../../actions/coverage';
import * as compare from '../../../../actions/compare';
import * as FormUtils from '../../../../../utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';

import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';
import { CarDetailForm } from './car-detail.form';
import { AddressForm } from '../../../../../address/components/address.form';
import { Car, CarCoverageRecommendation, CarCompare } from '../../../../models';
import { Price } from '../../../../../shared/models';
import { Address } from '../../../../../address/models';
import { createCarCoverages } from '../../../../utils/coverage.utils';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
@Component({
  selector: 'knx-car-detail-form',
  styleUrls: ['./car-detail.component.scss'],
  templateUrl: 'car-detail.component.html'
})
export class CarDetailComponent implements AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.carDetails;
  form: CarDetailForm;
  addressForm: AddressForm;
  coverages: Price[];
  address$: Observable<Address>;
  car$: Observable<Car>;
  isCarLoading$: Observable<boolean>;
  isCarFailed$: Observable<boolean>;
  advice$: Observable<any>;
  isCoverageLoading$: Observable<boolean>;
  isCoverageError$: Observable<boolean>;
  coverageRecommendation$: Observable<CarCoverageRecommendation>;
  subscriptions$: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  constructor(private store$: Store<fromRoot.State>,
    private tagsService: TagsService) {
    this.initializeForms();
    this.selectInitalStates();
    this.setInitialSubscriptions();
    this.currentStepOptions = {
      label: 'Je gegevens',
      nextButtonLabel: 'Naar resultaten',
      hideBackButton: true,
      hideNextButton: true
    };
  }

  selectInitalStates(): void {
    this.address$ = this.store$.select(fromAddress.getAddress);
    this.car$ = this.store$.select(fromCar.getCarInfo);
    this.isCarLoading$ = this.store$.select(fromCar.getCarInfoLoading);
    this.isCarFailed$ = this.store$.select(fromCar.getCarInfoError);
    this.isCoverageError$ = this.store$.select(fromCar.getCompareError);
    this.isCoverageLoading$ = this.store$.select(fromCar.getCompareLoading);
    this.coverageRecommendation$ = this.store$.select(fromCar.getCoverage);
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.addressForm = new AddressForm(formBuilder);
    this.form = new CarDetailForm(formBuilder, this.tagsService.getAsLabelValue('insurance_flow_household'));
    this.coverages = createCarCoverages(this.tagsService.getByKey('car_flow_coverage'));
  }

  /**
   * put all subscriptions in an array, so we can unsubscribe to them later on
   */
  setInitialSubscriptions(): void {
    this.subscriptions$ = [
      this.store$.select(fromInsurance.getSelectedAdvice)
          .filter(advice => advice)
          .subscribe(advice => this.setAdvice(advice)),
      this.advice$.subscribe(currentAdvice => {
        // start new advice only if there is no current one
        if (currentAdvice) {
          // do not pre-fill address
          // this.store$.select(fromProfile.getProfile).subscribe(currentProfile => {
          //   this.address.postcode = currentProfile.postcode;
          //   this.address.number = currentProfile.number;
          // });
        } else if (!currentAdvice) {
          this.store$.dispatch(new advice.Add({
            id: cuid()
          }));
        }
      }),

      this.store$.select(fromCar.getCarInfoError)
      .subscribe((error) => {
        // Subscribe to car errors
        if (error) {
          this.form.formGroup.get('licensePlate').updateValueAndValidity();
          this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.error.carNotFound', clear: true}));
        }
      }),

      this.store$.select(fromCar.getCarInfo)
      .subscribe((car: Car) => {
        // Subscribe to car info
        if (car && car.license) {
          this.form.formGroup.get('licensePlate').updateValueAndValidity();
          this.store$.dispatch(new assistant.AddCannedMessage({
            key: 'car.info.niceCar',
            value: car,
            clear: true
          }));
        }
      }),

      this.store$.select(fromCar.getCoverage)
      .filter(coverage => coverage !== null)
      .subscribe(coverageAdvice => {
        // Subscribe to coverage recommendation request
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
      })

    ];
  }

  ngAfterViewInit(): void {
    // set form validators after the view has been fully loaded, otherwise it is getting an error
    this.setFormAsyncValidators();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.welcome', clear: true}));
  }

  setFormAsyncValidators(): void {
    let licenseControl = this.form.formGroup.get('licensePlate');
    licenseControl.setAsyncValidators((formControl) => this.validateLicenseAsync(formControl));
    const loan = this.form.formGroup.get('loan');
    this.subscriptions$.push(
      loan.valueChanges.subscribe((value) => {
        if (value !== null && loan.valid) {
          this.store$.dispatch(new coverage.CarCoverageSetActiveLoan(value));
        }
      })
    );
    loan.setValue(false);
    FormUtils.validateControls(this.form.formGroup, ['loan']);
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

  /**
   * close all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions$.forEach(subsription => subsription.unsubscribe());
  }

  onLicensePlateChange(licensePlate: string): void {
    const validLength = 6;
    // control valid state is changed externally based on RDC request result,
    // so we use length here to determine when to proceed
    if (licensePlate && licensePlate.length === validLength) {
      this.store$.dispatch(new car.GetInfo(licensePlate));
      this.store$.dispatch(new car.GetMeldcode(licensePlate));
    }
  }

  private normalizeAddressHouseNumber(payload: any) {
    if (!payload.address) {
      return null;
    }

    return payload.address.number_extended.number_only;
  }

  private normalizeAddressHouseNumberAddition(payload: any) {
    if (!payload.address) {
      return null;
    }
    return payload.address.number_extended.number_extension;
  }

  updateSelectedCoverage(coverage: Price): void {
    this.form.formGroup.get('coverage').patchValue(coverage.id);
    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'car.info.' + coverage.id,
      clear: true
    }));
  }

  setAdvice(value: any): void {
    // TODO: check why here sometime comes string as value and sometime its an object
    if (value) {
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
  }

  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;
    const addressForm = this.addressForm.formGroup;
    FormUtils.validateForm(detailForm);

    if (!detailForm.valid || !addressForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }
    this.subscriptions$.push(
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
      }).take(1)
      .subscribe((compare) => {
        // add address in format for profile
        // TODO: is this really needed?
        this.subscriptions$[0].unsubscribe();
        this.store$.dispatch(new advice.Update(Object.assign({}, compare.request, {
          address: compare.address
          })));
        })
    );
    this.store$.select(fromInsurance.getSelectedAdvice)
      .filter(advice => advice !== undefined && Object.keys(advice).length > 1) // bit hackisch way to check for valid compare request
      .take(1)
      .subscribe(advice => {
        this.store$.dispatch(new compare.LoadCarAction(advice));
        this.store$.dispatch(new wizardActions.Forward());
      });
  }
}
