import { Component, OnDestroy, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TagsService } from '@app/core/services/tags.service';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as cuid from 'cuid';
import * as car from '@app/car/actions/car';
import * as fromRoot from '@app/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromCar from '@app/car/reducers';
import * as fromAddress from '@app/address/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as advice from '@app/insurance/actions/advice';
import * as coverage from '@app/car/actions/coverage';
import * as compare from '@app/car/actions/compare';
import * as FormUtils from '@app/utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';

import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { CarDetailForm } from './car-detail.form';
import { AddressForm } from '@app/address/components/address.form';
import { Car, CarCoverageRecommendation, CarCompare } from '@app/car/models';
import { Price } from '@app/shared/models';
import { Address } from '@app/address/models';
import { createCarCoverages } from '@app/car/utils/coverage.utils';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { FeatureConfigService } from '@app/core/services/feature-config.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { State as CarState } from '@app/car/reducers/car';
import { CarDataAvailableAction, CoverageAdviceAvailableAction } from '@app/core/actions/analytics';
import {
  CarDataAnaylitcsEvent,
  CarAnalytics,
  CoverageAdviceAnalyticsEvent,
  UserAnayltics,
  EcommerceAnalytics
} from '@app/core/models/analytics';
import { Advice } from '@app/insurance/models';
import { JamesTagPipe } from '@app/shared/pipes';

@Component({
  providers: [JamesTagPipe],
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
  carInfoLoading$: Observable<boolean>;
  carInfoError$: Observable<boolean>;
  carInfoLoaded$: Observable<boolean>;
  advice$: Observable<any>;
  isCoverageLoading$: Observable<boolean>;
  isCoverageError$: Observable<boolean>;
  coverageRecommendation$: Observable<CarCoverageRecommendation>;
  subscriptions$: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  copies: any = {};

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              private translateService: TranslateService,
              public featureToggleService: FeatureConfigService,
              public route: ActivatedRoute,
              public cdRef: ChangeDetectorRef,
              private jamesTag: JamesTagPipe
            ) {

    this.translateService.get([
      'car.advice.steps.detail.stepOptions.label',
      'car.advice.steps.detail.stepOptions.nextButton.label',
      'car.advice.steps.detail.form.licensePlate.label',
      'car.advice.steps.detail.form.licensePlate.placeholder',
      'car.advice.steps.detail.form.birthDate.label',

      'car.advice.steps.detail.form.claimFreeYears',
      'car.advice.steps.detail.form.loan.label',
      'car.advice.steps.detail.form.houseHold.label',
      'car.advice.steps.detail.form.houseHold.placeholder',
      'car.advice.steps.detail.form.gender.label',
      'car.advice.steps.detail.form.gender.placeholder'

    ]).subscribe(res => {
      this.copies = res;
      this.initializeForms();

    });
  }
  /**
   * keep track of all forms and when all data is available
   * on the page
   * filter trough all form fields except optional ones, that can be an empty string
  */
  setStepSupscription(): void {
    const detailForm = this.form.formGroup;
    const addressForm = this.addressForm.formGroup;
    const optionalFields: string[] = ['houseNumberExtension'];
    this.subscriptions$.push(
      Observable.combineLatest(detailForm.valueChanges, addressForm.valueChanges, (a, b) => Object.assign({}, a, b))
        .filter(combinedValues => {
          return Object.keys(combinedValues)
                       .filter(key => this.isAcceptedValue(combinedValues[key])
                          && optionalFields.indexOf(key) === -1)
                        .length === Object.keys(combinedValues).length - optionalFields.length;
        })
        .subscribe((values) => {
          this.dispatchcoverageAdviceAvailable();
        })
    );
  }

  selectInitialStates(): void {
    this.address$ = this.store$.select(fromAddress.getAddress);
    this.car$ = this.store$.select(fromCar.getCarInfo);

    this.carInfoLoading$ = this.store$.select(fromCar.getCarInfoLoading);
    this.carInfoError$ = this.store$.select(fromCar.getCarInfoError);
    this.carInfoLoaded$ = this.store$.select(fromCar.getCarInfoLoaded);

    this.isCoverageLoading$ = this.store$.select(fromCar.getCoverageLoading);
    this.isCoverageError$ = this.store$.select(fromCar.getCoverageError);

    this.coverageRecommendation$ = this.store$.select(fromCar.getCoverage);
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    this.currentStepOptions = {
      label: this.copies['car.advice.steps.detail.stepOptions.label'],
      nextButtonLabel: this.copies['car.advice.steps.detail.stepOptions.nextButton.label'],
      hideBackButton: true,
      hideNextButton: true
    };

    const formBuilder = new FormBuilder();
    this.addressForm = new AddressForm(formBuilder);
    this.form = new CarDetailForm(formBuilder,
      this.tagsService.getAsLabelValue('insurance_flow_household'),
      this.tagsService.getAsLabelValue('car_flow_gender'),
      this.tagsService.getAsLabelValue('car_flow_loan'),
      this.copies);

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
          this.coverages.forEach(item => {
            item.selected = false;
          });
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

    this.selectInitialStates();
    this.setInitialSubscriptions();
    this.setStepSupscription();

    // set form validators after the view has been fully loaded, otherwise it is getting an error
    const QUERY_PARAM_LICENCE = 'licencePlate'; // change this to correct get variable after talking with marketing
    if (this.route.snapshot && this.route.snapshot.queryParams) {
      const licencePlateValue = this.route.snapshot.queryParams[QUERY_PARAM_LICENCE];
      if (licencePlateValue) {
        let decodedLicencePlate = Buffer.from(licencePlateValue, 'base64').toString();

        this.form.formGroup.patchValue(Object.assign({}, {
          licensePlate: decodedLicencePlate || null
        }));
        this.form.formGroup.controls.licensePlate.markAsTouched();
        this.cdRef.detectChanges();
      }
    }
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
      this.dispatchCarDataAvailableAction();
    }
  }

  dispatchCarDataAvailableAction() {
    this.store$.select(fromCar.getCarState)
      .filter(carState => (carState.loaded || carState.error))
      .take(1)
      .subscribe((carState: CarState) => {
        let carLoadingError = '';
        let carData = {} as CarAnalytics;
        if (carState.error && !carState.license) {
          carLoadingError = this.form.validationErrors['licensePlateRDC']();
        }
        let carDataAvailableAction: CarDataAnaylitcsEvent = {
          event: 'carDataAvailable',
          error: carLoadingError,
          car: this.getCarData(carState)
        };
        this.store$.dispatch(new CarDataAvailableAction(carDataAvailableAction));
      });
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
          claimFreeYears: value.claim_free_years !== 0 ? value.claim_free_years || null : 0,
          houseHold: value.household_status || null,
          loan: !!value.active_loan,
          gender: value.gender ? value.gender : null,
          coverage: value.coverage || null,
        }));

        if (value.date_of_birth) {
          let dob = new Date(value.date_of_birth);
          this.form.formGroup.get('birthDate').setValue(dob);
        }

        // give address-lookup component time to set AsyncValidators before validate it
        setTimeout(() => {
          FormUtils.updateAndValidateControls(this.form.formGroup, value);
          FormUtils.updateAndValidateControls(this.addressForm.formGroup, value);
        });
      }
    }
  }

  goToNextStep(event ?: any) {
    const detailForm = this.form.formGroup;
    const addressForm = this.addressForm.formGroup;
    let coverageError = null;
    FormUtils.validateForm(detailForm);

    this.store$.select(fromCar.getCoverageError).take(1).subscribe(error => {
      coverageError = error;
    });

    if (!detailForm.valid || !addressForm.valid) {
      return coverageError ? false : this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
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
      .subscribe((advice: Advice) => {
        this.store$.dispatch(new compare.LoadCarAction(advice));
        this.store$.dispatch(new wizardActions.Forward());
      });
  }

  private dispatchcoverageAdviceAvailable() {
    this.store$.select(fromCar.getCarState)
      .filter(carState => (carState.loaded || carState.error))
      .take(1)
      .subscribe((carState: CarState) => {
        let coverageAdviceAvailableAction: CoverageAdviceAnalyticsEvent = {
          event: 'coverageAdviceAvailable',
          car: this.getCarData(carState),
          user: this.getUserData(),
          ecommerce: this.getEcommerceData()
        };
        this.store$.dispatch(new CoverageAdviceAvailableAction(coverageAdviceAvailableAction));
      });
  }

  private getCarData(carState: CarState): CarAnalytics {
    let carData = {} as CarAnalytics;
    if (carState.info) {
      carData.brand = carState.info.make;
      carData.model = carState.info.model;
      carData.color = carState.info.color;
      carData.fuel = carState.info.fuel;
      carData.transmission = this.getTransmission(carState.info);
      carData.constructionYear = carState.info.year.toString();
      carData.purchaseValue = carState.info.price_consumer_incl_vat.toString();
      carData.dayValue = carState.info.current_value.toString();
    }
    return carData;
  }

  private getUserData(): UserAnayltics {
    const detailForm = this.form.formGroup;
    const addressForm = this.addressForm.formGroup;
    let userAnalytics = {} as UserAnayltics;
    userAnalytics.damageFreeYears = detailForm.get('claimFreeYears').value;
    userAnalytics.loan = detailForm.get('loan').value ? 'y' : 'n' ;
    userAnalytics.gender = detailForm.get('gender').value;
    userAnalytics.birthyear = new Date(detailForm.get('birthDate').value).getUTCFullYear().toString();
    userAnalytics.zipcode = addressForm.get('postalCode').value.slice(0, 4);
    userAnalytics.familySituation = this.jamesTag
      .transform(detailForm.get('houseHold').value, 'insurance_flow_household');
    return userAnalytics;
  }

  private getEcommerceData(): EcommerceAnalytics {
    const detailForm = this.form.formGroup;
    let ecommerceAnalytics = {} as EcommerceAnalytics;
    ecommerceAnalytics.detail = {
      actionField: {
        list: 'coverageAdvice'
      },
      products: [{
        name: this.jamesTag.transform(detailForm.get('coverage').value, 'car_flow_coverage'),
        category: 'verzekeren',
        variant: 'autoverzekering'
      }]
    };
    return ecommerceAnalytics;
  }

  private getTransmission(data) {
    return data.nicci_cartransmission_manual_transmission ||
      data.nicci_cartransmission_automatic_transmission ||
      data.transmission_nl;
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

  /**
   * Accepted values are not empty string, any number and a boolean value
   * @param value value from addressform and form
   */
  private isAcceptedValue(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }
}
